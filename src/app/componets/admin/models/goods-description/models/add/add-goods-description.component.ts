import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {errorObject} from "rxjs/internal-compatibility";
import {Store} from "@ngrx/store";
import {TranslateService} from "@ngx-translate/core";
import {GoodsDescriptionService} from "../../../../../../service/goods-description/goods-description.service";
import {IGoodsDescription, IGoodsDescriptionCreate} from "../../../../../../models/interfaces/goods-description/goods-description.model";
import {GoodsDescriptionActions} from "../../../../../../store/actions/goods-description/goods-description.action";

@Component({
  selector: 'admin-add-goods-description',
  templateUrl: './add-goods-description.component.html',
  styleUrls: ['./add-goods-description.component.css']
})
export class AddGoodsDescriptionComponent implements OnInit{

  form!: FormGroup;

  errors: any;
  errorsFV: any;
  errorZero: string = "The server is down";

  flagErrors: boolean = false;
  flagErrorsFV: boolean = false;
  flagErrorZero: boolean = false;

  get goodsId() { return this.form.get('goodsId');}
  get languageId() { return this.form.get('languageId');}
  get description() { return this.form.get('description');}


  constructor(private goodsDescriptionService: GoodsDescriptionService,
              private router: Router,
              public dialog: MatDialog,
              private store: Store,
              private translateService: TranslateService) {
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      'goodsId': new FormControl(1,
        [Validators.required]),
      'languageId':new FormControl(10,
        [Validators.required]),
      'description': new FormControl('new description',
        [Validators.required])
    });
  }

  getErrorMessageGoodsId() {
    return this.goodsId!.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageLanguageId() {
    return this.languageId!.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageDescription() {
    return this.description!.hasError('required') ? 'You must enter a value' : '';
  }

  onAddGoodsDescriptionClick() {
    if (this.form.valid) {
      const { goodsId, languageId, description} = this.form.value;
      const goodsDescriptionCreate: IGoodsDescriptionCreate ={
        goodsId: goodsId,
        languageId: languageId,
        description: description
      }
      this.goodsDescriptionService.create(goodsDescriptionCreate).subscribe((res: IGoodsDescription) => {
        if (res != null){
          this.store.dispatch(GoodsDescriptionActions.addGoodsDescription({goodsDescription: res}));
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
