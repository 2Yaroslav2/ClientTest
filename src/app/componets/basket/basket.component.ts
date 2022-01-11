import {Component, Input, OnInit} from '@angular/core';
import {BasketService} from "../../service/basket/basket.service";
import {IBasket} from "../../models/interfaces/basket/basket.model";
import {Store} from "@ngrx/store";
import {BasketSelectors} from "../../store/selectors/basket/basket.selectors";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  items: IBasket[]= [];
  totalPrice: number = 0;

  constructor(private basketService: BasketService,private store: Store, public dialog: MatDialog) {
    this.store.select(BasketSelectors.selectAllBasketGoods).subscribe(basketGoods => {this.items = basketGoods});
    this.totalPrice = this.basketService.checkTotalPrice(this.items);
  }

  removeItem(product: IBasket) {
    this.basketService.removeItem(product);
    this.totalPrice = this.basketService.checkTotalPrice(this.items);
  }

  reduceCount(product: IBasket) {
    this.basketService.reduceCountProduct(product);
    this.totalPrice = this.basketService.checkTotalPrice(this.items);
  }

  addCount(product: IBasket) {
    this.basketService.addCountProduct(product);
    this.totalPrice = this.basketService.checkTotalPrice(this.items);
  }

  closeWindowLogin() {
    this.dialog.closeAll();
  }
}
