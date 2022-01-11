import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {IGoods} from "../../../models/interfaces/goods/goods.model";
import {GoodsSelectors} from "../../../store/selectors/goods/goods.selecters";
import {BasketService} from "../../../service/basket/basket.service";
import {GoodsDescriptionService} from "../../../service/goods-description/goods-description.service";
import {LanguageSelectors} from "../../../store/selectors/language/language.selecters";
import {AuthService} from "../../authorization/auth.service";

@Component({
  selector: 'app-more-goods-info',
  templateUrl: './more-goods-info.component.html',
  styleUrls: ['./more-goods-info.component.css']
})
export class MoreGoodsInfoComponent {

  item: IGoods = {
    id: 0,
    name: '',
    price: 0,
    numberOfDays: 0,
    quantityInStock: 0,
    categoryId: 0,
    discount: 0,
    countPurchased: 0,
    image: ''
  };
  description: string = "Empty";

  constructor(private store: Store,
              private basketService: BasketService,
              private goodsDescription: GoodsDescriptionService, private authService: AuthService) {
    this.store.select(GoodsSelectors.selectCurrentGoods).subscribe(goods=> {
      if (goods != null && goods != 0){
        this.item = goods;
        this.store.select(LanguageSelectors.selectCurrentLanguageId).subscribe(languageId=>{
          if (languageId != null){
            this.goodsDescription.getWhere(this.item.id, languageId).subscribe(tmp => {
              if (tmp != null){
                this.description = tmp;
              }
            });
          }
        });
      }
    }, error => {
    });
  }

  addGoodsInBasket(item: IGoods) {
    if (this.authService.isUserAuth$.value){
      if (item != null){
        this.basketService.addGoodsInBasket(item);
      }
    }
  }
}
