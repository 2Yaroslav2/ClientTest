import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {
  IGoodsDescriptionCreate,
  IGoodsDescription
} from "../../models/interfaces/goods-description/goods-description.model";
import {Observable} from "rxjs";

@Injectable()
export class GoodsDescriptionService {

  constructor(private httpClient: HttpClient) {

  }

  getAll(){
    let limit: number = 1;
    return this.httpClient.get<IGoodsDescription[]>([environment.API_URL, 'goodsDescription', 'getAll'].join('/'), {
      params: new HttpParams().set('limit', limit)
    });
  }

  getWhere(goodsId: number, languageId: number): Observable<any>{
    return this.httpClient.get([environment.API_URL, 'goodsDescription', 'getWhere'].join('/'), {
      params: new HttpParams().set('goodsId', goodsId).set('languageId', languageId)
    })
  }

  getById(id: number){
    return this.httpClient.get<IGoodsDescription[]>([environment.API_URL, 'goodsDescription', 'getById'].join('/'), {
      params: new HttpParams().set('id', id)
    });
  }

  create(goods: IGoodsDescriptionCreate): Observable<any>{
    return this.httpClient.post([environment.API_URL, 'goodsDescription', 'create'].join('/'), goods);
  }

  delete(id: number){
    return this.httpClient.delete([environment.API_URL, 'goodsDescription', 'delete'].join('/'), {
      params: new HttpParams().set('id', id)
    });
  }

  update(goods: IGoodsDescription): Observable<any>{
    return this.httpClient.put([environment.API_URL, 'goodsDescription', 'update'].join('/'), goods);
  }
}
