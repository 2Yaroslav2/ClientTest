import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {errorObject} from "rxjs/internal-compatibility";
import {Store} from "@ngrx/store";
import {TranslateService} from "@ngx-translate/core";
import {GoodsService} from "../../../../../../service/goods/goods.service";
import {IGoods, IGoodsCreate} from "../../../../../../models/interfaces/goods/goods.model";
import {GoodsActions} from "../../../../../../store/actions/goods/goods.actions";
import {GoodsSelectors} from "../../../../../../store/selectors/goods/goods.selecters";

@Component({
  selector: 'admin-edit-goods',
  templateUrl: './edit-goods.component.html',
  styleUrls: ['./edit-goods.component.css']
})
export class EditGoodsComponent implements OnInit{

  tmpGoods!: IGoods;

  form!: FormGroup;

  errors: any;
  errorsFV: any;
  errorZero: string = "The server is down";

  flagErrors: boolean = false;
  flagErrorsFV: boolean = false;
  flagErrorZero: boolean = false;

  get name() { return this.form.get('name');}
  get price() { return this.form.get('price');}
  get numberOfDays() { return this.form.get('numberOfDays');}
  get quantityInStock() { return this.form.get('quantityInStock');}
  get categoryId() { return this.form.get('categoryId');}
  get discount() { return this.form.get('discount');}
  get image() { return this.form.get('image');}

  constructor(private goodsService: GoodsService,
              private router: Router,
              public dialog: MatDialog,
              private store: Store,
              private translateService: TranslateService) {
    this.store.select(GoodsSelectors.selectCurrentGoods).subscribe(res=>{
      if (res != null && res != 0){
        this.tmpGoods = res;
        // this.form.setValue({
        //   id: res.id,
        //   name: res.name,
        //   price: res.price,
        //   numberOfDays: res.numberOfDays,
        //   quantityInStock: res.quantityInStock,
        //   categoryId: res.categoryId,
        //   discount: res.discount,
        //   image: res.image,
        //   countPurchased: res.countPurchased
        // });
      }
    });
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(this.tmpGoods.id),
      'name': new FormControl(this.tmpGoods.name,
        [Validators.required]),
      'price':new FormControl(this.tmpGoods.price,
        [Validators.required]),
      'numberOfDays': new FormControl(this.tmpGoods.numberOfDays,
        [Validators.required]),
      'quantityInStock': new FormControl(this.tmpGoods.quantityInStock,
        [Validators.required]),
      'categoryId': new FormControl(this.tmpGoods.categoryId,
        [Validators.required]),
      'discount': new FormControl(this.tmpGoods.discount,
        [Validators.required]),
      'image': new FormControl(this.tmpGoods.image,
        [Validators.required]),
      'countPurchased':new FormControl(this.tmpGoods.countPurchased)
    });
  }

  getErrorMessageName() {
    return this.name!.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessagePrice() {
    return this.price!.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageNumberOfDays() {
    return this.numberOfDays!.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageQuantityInStock() {
    return this.quantityInStock!.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageCategoryId() {
    return this.categoryId!.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageDiscount() {
    return this.discount!.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageImage() {
    return this.image!.hasError('required') ? 'You must enter a value' : '';
  }

  onEditGoodsClick() {
    if (this.form.valid) {
      const {id, name, price, numberOfDays, quantityInStock, categoryId, discount, image, countPurchased} = this.form.value;
      const goods: IGoods ={
        id: id,
        name: name,
        price: price,
        numberOfDays: numberOfDays  ,
        quantityInStock: quantityInStock ,
        categoryId: categoryId,
        discount: discount,
        image: image,
        countPurchased: countPurchased
      }
      this.goodsService.update(goods).subscribe((res:IGoods) => {
        if (res != null){
          this.store.dispatch(GoodsActions.updateGoods({update:{id: res.id, changes: res}}));
        }
        this.dialog.closeAll();
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
