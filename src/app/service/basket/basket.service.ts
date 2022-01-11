import {Injectable} from "@angular/core";
import {IBasket} from "../../models/interfaces/basket/basket.model";
import {IShop} from "../../models/interfaces/shop/shop.model";
import {select, Store} from "@ngrx/store";
import {BasketSelectors} from "../../store/selectors/basket/basket.selectors";
import {BasketActions} from "../../store/actions/basket/basket.actions";
import {BASKET_KEY} from "../../shared/key/any.key";
import {Update} from "@ngrx/entity";
import {filter} from "rxjs/operators";
import {of, pipe} from "rxjs";
import {IGoods} from "../../models/interfaces/goods/goods.model";



@Injectable()
export class BasketService {

  constructor(private store: Store) {
  }

  checkTotalPrice(items: IBasket[]): number{
    if (items.length > 0){
      let tmpTotalPrice: number = 0;
      for(let i = 0; i < items.length; i++){
        tmpTotalPrice += items[i].price;
      }
      return  tmpTotalPrice;
    }
    else{
      return 0;
    }
  }


  addGoodsInBasket(shopGoods: IGoods): void {

    // this.store.select(BasketSelectors.selectAllBasketGoods)
    //   .pipe(filter(items=> items.length >= 0, (item: { id: number; }) => item.id != shopGoods.id))
    //   .subscribe(() => {
    //     this.store.dispatch(BasketActions.addBasketGoods({basketData: {
    //         ...shopGoods,
    //         currentPrice: shopGoods.price,
    //         quantity: 1
    //       }}));
    //   }).unsubscribe();

    let flag: boolean = false;
    let items: IBasket[] = [];

    this.store.select(BasketSelectors.selectAllBasketGoods).subscribe(list=>items = list);

    if (items != null){
      for (let i = 0; i < items.length; i++){
        if (shopGoods.id == items[i].id){
          flag = true;
          break;
        }
      }

      if (!flag){
        this.store.dispatch(BasketActions.addBasketGoods({basketData: {
            id: shopGoods.id,
            title: shopGoods.name,
            srcImg: shopGoods.image,
            price: shopGoods.price,
            currentPrice: shopGoods.price,
            quantity: 1
          }}));
      }
    }
    else {
      this.store.dispatch(BasketActions.addBasketGoods({basketData: {
          id: shopGoods.id,
          title: shopGoods.name,
          srcImg: shopGoods.image,
          price: shopGoods.price,
          currentPrice: shopGoods.price,
          quantity: 1
        }}));
    }
  }

  removeItem(product: IBasket): void {
    this.store.dispatch(BasketActions.removeBasketGoods({id: product.id}));
  }

  reduceCountProduct(product: IBasket): void {
    if (product != null){
      let tmpCount: number = 0;
      let tmpPrice: number = 0;

      if (product.quantity > 1){
         tmpCount = product.quantity - 1;
         tmpPrice = product.price - product.currentPrice;
         this.updateProduct(tmpCount, tmpPrice,product);
      }
    }

  }

  addCountProduct(product: IBasket): void {
    if (product != null){
      let tmpCount = product.quantity + 1;
      let  tmpPrice = product.price + product.currentPrice;

      this.updateProduct(tmpCount, tmpPrice,product);
    }
  }

  updateProduct(count: number, price: number, product: IBasket): void{
    let tmp: IBasket ={
      ...product,
      quantity: count,
      price: price
    }

    this.store.dispatch(BasketActions.updateBasketGoods({update: {id: tmp.id, changes: tmp}}));
  }

}

