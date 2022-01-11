import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BasketService} from "../../service/basket/basket.service";
import {IShop} from "../../models/interfaces/shop/shop.model";
import {Store} from "@ngrx/store";
import {GoodsActions} from "../../store/actions/goods/goods.actions";
import {IGoods} from "../../models/interfaces/goods/goods.model";
import {GoodsSelectors} from "../../store/selectors/goods/goods.selecters";
import {GoodsService} from "../../service/goods/goods.service";
import {ICategory} from "../../models/interfaces/category/category.model";
import {CategoryService} from "../../service/category/category.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {CategorySelectors} from "../../store/selectors/category/category.selectors";
import {LanguageSelectors} from "../../store/selectors/language/language.selecters";
import {filter} from "rxjs/operators";
import {CategoryAction} from "../../store/actions/category/category.action";
import {AuthService} from "../authorization/auth.service";


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  goods: IGoods[] = [];
  categories: ICategory[] = [];
  filtersFormGroup!: FormGroup;

  constructor(private store: Store,
              private basketService: BasketService,
              private goodsService: GoodsService,
              public categoryService: CategoryService,
              public authService: AuthService) {

    this.getAllGoods();
    this.filtersFormGroup = new FormGroup({
      filters: new FormArray([])
    });
    this.getCategoryFromStore();
  }

  get filtersArray(): FormArray {
    return this.filtersFormGroup.controls.filters as FormArray;
  }

  addProductInBasket(shopGoods: IGoods) {
    if (this.authService.isUserAuth$.value){
      this.basketService.addGoodsInBasket(shopGoods);
    }
  }

  getAllGoods(){
    this.goodsService.getAll().subscribe((items)=>{
      this.goods = items;
      this.store.dispatch(GoodsActions.addListGoods({listGoods: items}));
    });
  }

  getCategoryFromStore(){

    this.store.select(CategorySelectors.selectAllCategory)
      .subscribe(items => {
        this.filtersArray.clear();
        this.categories = items;
        if (this.categories.length == 0){
          this.categoryService.getWhereCategory();
        }
        this.categories.forEach(() => this.filtersArray.push(new FormControl(false)));

      });
  }


  viewMoreInfo(id: number) {
    this.store.dispatch(GoodsActions.selectGoods({id: id}));
  }

  categoryFilter(){
    this.filtersFormGroup.valueChanges.subscribe(formState => {
      const selectedCategories = formState.filters
        .map((checked: boolean, idx: number) => checked ? this.categories[idx] : null)
        .filter(Boolean);
      this.goods = this.categoryService.applyFilter(selectedCategories, this.goods);

    });
  }

  ngOnInit(): void {
    this.categoryFilter();
  }
}
