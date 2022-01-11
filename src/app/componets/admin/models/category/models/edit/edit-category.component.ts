import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {errorObject} from "rxjs/internal-compatibility";
import {Store} from "@ngrx/store";
import {TranslateService} from "@ngx-translate/core";
import {CategoryService} from "../../../../../../service/category/category.service";
import {ICategory} from "../../../../../../models/interfaces/category/category.model";
import {CategoryAction} from "../../../../../../store/actions/category/category.action";
import {CategorySelectors} from "../../../../../../store/selectors/category/category.selectors";

@Component({
  selector: 'admin-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit{

  form!: FormGroup;

  tmpCategory!: ICategory;

  errors: any;
  errorsFV: any;
  errorZero: string = "The server is down";

  flagErrors: boolean = false;
  flagErrorsFV: boolean = false;
  flagErrorZero: boolean = false;

  get name() { return this.form.get('name');}
  get languageId() { return this.form.get('languageId');}
  get categoryId() { return this.form.get('categoryId');}


  constructor(private categoryService: CategoryService,
              private router: Router,
              public dialog: MatDialog,
              private store: Store,
              private translateService: TranslateService) {
    this.store.select(CategorySelectors.selectCurrentCategory).subscribe(item=>{
      if (item != null && item != 0){
        this.tmpCategory = item;
      }
    })
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(this.tmpCategory.name,
        [Validators.required]),
      'languageId':new FormControl(this.tmpCategory.languageId,
        [Validators.required]),
      'categoryId': new FormControl(this.tmpCategory.categoryId,
        [Validators.required])
    });
  }

  getErrorMessageName() {
    return this.name!.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageLanguageId() {
    return this.languageId!.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageCategoryId() {
    return this.categoryId!.hasError('required') ? 'You must enter a value' : '';
  }

  onEditCategoryClick() {
    if (this.form.valid) {
      const {name, languageId, categoryId} = this.form.value;
      const category: ICategory ={
        id: this.tmpCategory.id,
        name: name,
        languageId: languageId,
        categoryId: categoryId
      }
      this.categoryService.update(category).subscribe((res: ICategory) => {
        if (res != null){
          this.store.dispatch(CategoryAction.updateCategory({update: {id: res.id, changes: res}}));
          this.dialog.closeAll();
        }
      }, error => {
        if (error.statusText == "Unknown Error"){
          this.flagErrorZero = true;
        }
        if (error.error[0].key != null){
          this.errorsFV = error.error;
          this.flagErrorsFV = true;
        }
        else {
          this.errors = error.error;
          this.flagErrors = true;
        }
      });
    }
  }

  closeWindowAddGoods() {
    this.dialog.closeAll();
  }
}
