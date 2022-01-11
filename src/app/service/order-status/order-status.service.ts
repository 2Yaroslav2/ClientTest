import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {IGoods} from "../../models/interfaces/goods/goods.model";
import {environment} from "../../../environments/environment";
import {IOrderStatus} from "../../models/interfaces/order/order.model";

@Injectable()
export class OrderStatusService {

  constructor(private httpClient: HttpClient, private store: Store) {

  }

  getAll(){
    let limit: number = 1;
    return this.httpClient.get<IOrderStatus[]>([environment.API_URL, 'orderStatus', 'getAll'].join('/'), {
      params: new HttpParams().set('limit', limit)});
  }

  create(name: string){
    return this.httpClient.post([environment.API_URL, 'orderStatus', 'create'].join('/'), {name});
  }
  delete(id: number){
    // return this.httpClient.delete([environment.API_URL, 'category', 'delete',{id}].join('/'));
    return this.httpClient.delete([environment.API_URL, 'orderStatus', 'delete'].join('/'), {
      params: new HttpParams().set('id', id)
    });
  }
  update(name: string){
    return this.httpClient.put([environment.API_URL, 'orderStatus', 'update'].join('/'), {name});
  }
}
