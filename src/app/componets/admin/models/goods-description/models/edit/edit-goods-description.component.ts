import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {errorObject} from "rxjs/internal-compatibility";
import {Store} from "@ngrx/store";
import {TranslateService} from "@ngx-translate/core";
import {GoodsDescriptionService} from "../../../../../../service/goods-description/goods-description.service";
import {GoodsDescriptionActions} from "../../../../../../store/actions/goods-description/goods-description.action";
import {GoodsDescriptionSelectors} from "../../../../../../store/selectors/goods-description/goods-description.selecters";
import {IGoodsDescription} from "../../../../../../models/interfaces/goods-description/goods-description.model";

@Component({
  selector: 'admin-edit-goods-description',
  templateUrl: './edit-goods-description.component.html',
  styleUrls: ['./edit-goods-description.component.css']
})
export class EditGoodsDescriptionComponent implements OnInit{

  form!: FormGroup;
  tmpGoodsDescription!: IGoodsDescription;

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

    this.store.select(GoodsDescriptionSelectors.selectCurrentGoodsDescription).subscribe(res =>{
      if (res != null && res != 0){
        console.log('res: ',res);
        this.tmpGoodsDescription = res;
      }
    });
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      'goodsId': new FormControl(this.tmpGoodsDescription.goodsId,
        [Validators.required]),
      'languageId':new FormControl(this.tmpGoodsDescription.languageId,
        [Validators.required]),
      'description': new FormControl(this.tmpGoodsDescription.description,
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

  onEditGoodsDescriptionClick() {
    if (this.form.valid) {
      const { goodsId, languageId, description} = this.form.value;
      const goodsDescriptionCreate: IGoodsDescription ={
        id: this.tmpGoodsDescription.id,
        goodsId: goodsId,
        languageId: languageId,
        description: description
      }
      this.goodsDescriptionService.update(goodsDescriptionCreate).subscribe((res: IGoodsDescription) => {
        if (res != null){
          this.store.dispatch(GoodsDescriptionActions.updateGoodsDescription({update: {id: res.id, changes: res}}));
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
