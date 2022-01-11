import { Component } from '@angular/core';
import {IGoods} from "../../models/interfaces/goods/goods.model";
import {GoodsActions} from "../../store/actions/goods/goods.actions";
import {Store} from "@ngrx/store";
import {BasketService} from "../../service/basket/basket.service";
import {GoodsDescriptionService} from "../../service/goods-description/goods-description.service";
import {GoodsService} from "../../service/goods/goods.service";
import {AuthService} from "../authorization/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  goods: IGoods[] = [
    // {
    //   id: 1,
    //   image: "/assets/home-assets/spoken-english-language-course.jpg",
    //   name: "goods 1",
    //   price: 10,
    //   categoryId: 1,
    //   countPurchased: 10,
    //   discount: 0,
    //   numberOfDays: 0,
    //   quantityInStock: 0
    // },
    // {
    //   id: 1,
    //   image: "/assets/home-assets/spoken-english-language-course.jpg",
    //   name: "goods 2",
    //   price: 10,
    //   categoryId: 1,
    //   countPurchased: 10,
    //   discount: 0,
    //   numberOfDays: 0,
    //   quantityInStock: 0
    // },
    // {
    //   id: 1,
    //   image: "/assets/home-assets/spoken-english-language-course.jpg",
    //   name: "goods 3",
    //   price: 10,
    //   categoryId: 1,
    //   countPurchased: 10,
    //   discount: 0,
    //   numberOfDays: 0,
    //   quantityInStock: 0
    // }
  ];

  constructor(private store: Store,
              private basketService: BasketService,
              private goodsService: GoodsService,
              private  authService: AuthService) {
    this.goodsService.getWhere().subscribe(items => {
      if (items != null){
        this.goods = items;
        this.store.dispatch(GoodsActions.addListGoods({listGoods: items}));
      }
      }, error => {
      //TODO:
      this.goods = [  {
        id: 0,
        image: "/assets/home-assets/spoken-english-language-course.jpg",
        name: "plug",
        price: 0,
        categoryId: 0,
        countPurchased: 0,
        discount: 0,
        numberOfDays: 0,
        quantityInStock: 0
      },
        {
          id: 0,
          image: "/assets/home-assets/spoken-english-language-course.jpg",
          name: "plug",
          price: 0,
          categoryId: 0,
          countPurchased: 0,
          discount: 0,
          numberOfDays: 0,
          quantityInStock: 0
        },
        {
          id: 0,
          image: "/assets/home-assets/spoken-english-language-course.jpg",
          name: "plug",
          price: 0,
          categoryId: 0,
          countPurchased: 0,
          discount: 0,
          numberOfDays: 0,
          quantityInStock: 0
        }]
    })
  }

  moreInfo(id: number) {
    this.store.dispatch(GoodsActions.selectGoods({id: id}));
  }

  addProductInBasket(product: IGoods) {
    if (this.authService.isUserAuth$.value && product.name != "plug"){
      this.basketService.addGoodsInBasket(product);
    }
  }
}
