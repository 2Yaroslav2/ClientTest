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

@Component({
  selector: 'admin-add-goods',
  templateUrl: './add-goods.component.html',
  styleUrls: ['./add-goods.component.css']
})
export class AddGoodsComponent implements OnInit{

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
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl('new goods 2',
        [Validators.required]),
      'price':new FormControl(10,
        [Validators.required]),
      'numberOfDays': new FormControl(0,
        [Validators.required]),
      'quantityInStock': new FormControl(20,
        [Validators.required]),
      'categoryId': new FormControl(1,
        [Validators.required]),
      'discount': new FormControl(0,
        [Validators.required]),
      'image': new FormControl('/assets/home-assets/spoken-english-language-course.jpg',
        [Validators.required])
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

  onAddGoodsClick() {
    if (this.form.valid) {
      const { name, price, numberOfDays, quantityInStock, categoryId, discount, image} = this.form.value;
      const goods: IGoodsCreate ={
        name: name,
        price: price,
        numberOfDays: numberOfDays  ,
        quantityInStock: quantityInStock ,
        categoryId: categoryId,
        discount: discount,
        image: image,
        countPurchased: 0
      }
      this.goodsService.create(goods).subscribe((res: IGoods) => {
        if (res != null){
          this.store.dispatch(GoodsActions.addGoods({goods: res}));
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
