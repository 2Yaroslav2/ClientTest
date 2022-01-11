import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IGoods} from "../../models/interfaces/goods/goods.model";
import {environment} from "../../../environments/environment";
import {ICategory, ICategoryCreate} from "../../models/interfaces/category/category.model";
import {IShop} from "../../models/interfaces/shop/shop.model";
import {Store} from "@ngrx/store";
import {CategorySelectors} from "../../store/selectors/category/category.selectors";
import {filter} from "rxjs/operators";
import {LanguageSelectors} from "../../store/selectors/language/language.selecters";
import {CategoryAction} from "../../store/actions/category/category.action";
import {GoodsSelectors} from "../../store/selectors/goods/goods.selecters";
import {Observable} from "rxjs";
@Injectable()
export class CategoryService  {

  categories: ICategory[] = [
    {id: 1, name: 'Audio', languageId: 1, categoryId: 1},
    {id: 2, name: 'Book', languageId: 1, categoryId: 2},
    {id: 3, name: 'Video', languageId: 1, categoryId: 3},
    {id: 4, name: 'Dictionary', languageId: 1, categoryId: 4},
    {id: 5, name: 'Course', languageId: 1, categoryId: 5}
  ]

  oldGoods: IShop[]=[
    {id: 1,
      title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      categoryId: 2 ,
      price: 50,
      srcImg: '/assets/basket-assets/goods1.png', address: "book"
    },
    {id: 2,
      title: 'title 2',
      categoryId: 1 ,
      price: 100,
      srcImg: '/assets/basket-assets/goods1.png', address: "audio"
    },
    {id: 3,
      title: 'title 3',
      categoryId: 3 ,
      price: 50,
      srcImg: '/assets/basket-assets/goods1.png', address: "video"
    },
    {id: 4,
      title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      categoryId: 4 ,
      price: 100,
      srcImg: '/assets/basket-assets/goods1.png', address: "dictionary"
    },
    {id: 5,
      title: 'title 5',
      categoryId: 5 ,
      price: 50,
      srcImg: '/assets/basket-assets/goods1.png', address: "course"
    },
    {id: 6,
      title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      categoryId: 2 ,
      price: 100,
      srcImg: '/assets/home-assets/spoken-english-language-course.jpg', address: "book"
    }
  ]

  constructor(private httpClient: HttpClient, private store:Store) {
  }

  applyFilter(filterValue: any, items: IGoods[]) {
    let listItems: IGoods[] = [];
    this.store.select(GoodsSelectors.selectAllGoods).subscribe((list) => {listItems = list});

    if (filterValue.length != 0){
      let res : IGoods[] = [];
      for (let i = 0; i < filterValue.length; i++){
        for (let k =0; k < listItems.length; k++){
          if (listItems[k].categoryId == filterValue[i].categoryId){
            res.push(listItems[k]);
          }
        }
      }
      items = res;
    }
    else {
      items = listItems;
    }
    return items;

  }

  // заглушка
  applyFilterTmp(filterValue: any, items: IShop[]){
    if (filterValue.length != 0){
      let res : IShop[] = [];
      for (let i = 0; i < filterValue.length; i++){
        for (let k =0; k < this.oldGoods.length; k++){
          if (this.oldGoods[k].categoryId == filterValue[i].categoryId){
            res.push(this.oldGoods[k]);
          }
        }
      }
      items = res;
    }
    else {
      items = this.oldGoods;
    }
    return items;
  }


  getAll(){
    let limit: number = 1;
    return this.httpClient.get<ICategory[]>([environment.API_URL, 'category', 'getAll'].join('/'), {
      params: new HttpParams().set('limit', limit)});
  }

  getWhere(languageId: number){
    return this.httpClient.get<ICategory[]>([environment.API_URL, 'category', 'getWhere'].join('/'), {
      params: new HttpParams().set('languageId', languageId)});
  }


  getWhereCategory(){
    this.store.select(LanguageSelectors.selectCurrentLanguageId).subscribe(id => {
      if (id != null) {
        this.getWhere(id).subscribe(items => {
          this.store.dispatch(CategoryAction.addListCategory({categories: items}));
        });
      }
    });
  }

  create(categoryCreate: ICategoryCreate): Observable<any>{
    return this.httpClient.post([environment.API_URL, 'category', 'create'].join('/'), categoryCreate);
  }
  delete(id: number){
    // return this.httpClient.delete([environment.API_URL, 'category', 'delete',{id}].join('/'));
    return this.httpClient.delete([environment.API_URL, 'category', 'delete'].join('/'), {
      params: new HttpParams().set('id', id)
    });
  }
  update(category: ICategory): Observable<any>{
    return this.httpClient.put([environment.API_URL, 'category', 'update'].join('/'), category);
  }

}
