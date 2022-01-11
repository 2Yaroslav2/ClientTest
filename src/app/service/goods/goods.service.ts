import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IGoodsCreate, IGoods} from "../../models/interfaces/goods/goods.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class GoodsService {

  constructor(private httpClient: HttpClient) {

  }

  getAll(){
    let limit: number = 1;
    return this.httpClient.get<IGoods[]>([environment.API_URL, 'goods', 'getAll'].join('/'), {
      params: new HttpParams().set('limit', limit)});
  }

  getWhere(){
    let limit: number = 1;
    return this.httpClient.get<IGoods[]>([environment.API_URL, 'goods', 'getWhere'].join('/'), {
      params: new HttpParams().set('limit', limit)});
  }

  create(goods: IGoodsCreate) : Observable<any>{
    return this.httpClient.post([environment.API_URL, 'goods', 'create'].join('/'), goods);
  }

  delete(id: number){
    return this.httpClient.delete([environment.API_URL, 'goods', 'delete'].join('/'), {
      params: new HttpParams().set('id', id)
    });
  }

  update(goods: IGoods): Observable<any>{
    return this.httpClient.put([environment.API_URL, 'goods', 'update'].join('/'), goods);
  }
}
