import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {errorObject} from "rxjs/internal-compatibility";
import {Store} from "@ngrx/store";
import {TranslateService} from "@ngx-translate/core";
import {CategoryService} from "../../../../../../service/category/category.service";
import {ICategory, ICategoryCreate} from "../../../../../../models/interfaces/category/category.model";
import {CategoryAction} from "../../../../../../store/actions/category/category.action";

@Component({
  selector: 'admin-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  form!: FormGroup;

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
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl('new category',
        [Validators.required]),
      'languageId':new FormControl(10,
        [Validators.required]),
      'categoryId': new FormControl(1,
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



  onAddCategoryClick() {
    if (this.form.valid) {
      const { name, languageId, categoryId} = this.form.value;
      const categoryCreate: ICategoryCreate ={
        name: name,
        languageId: languageId,
        categoryId: categoryId
      }
      this.categoryService.create(categoryCreate).subscribe((res: ICategory) => {
        if (res != null){
          this.store.dispatch(CategoryAction.addCategory({category: res}));
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
