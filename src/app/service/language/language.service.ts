import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IGoods} from "../../models/interfaces/goods/goods.model";
import {environment} from "../../../environments/environment";
import {Store} from "@ngrx/store";
import {LanguageSelectors} from "../../store/selectors/language/language.selecters";
import {filter} from "rxjs/operators";
import {LanguageActions} from "../../store/actions/language/language.action";
import {ILanguage} from "../../models/interfaces/language/language.model";
import {Observable} from "rxjs";

@Injectable()
export class LanguageService {

  constructor(private httpClient: HttpClient, private store:Store) {

  }

  setCurrentLanguage(language: string){
    this.store.select(LanguageSelectors.selectAllLanguage)
      .pipe(filter(items=>items.length > 0))
      .subscribe((listLanguages)=>{
        let res = listLanguages.filter(item=> item.name == language);
        if (res != null){
          this.store.dispatch(LanguageActions.selectLanguage({id: res[0].id}));
        }
      });
  }

  getAll(){
    let limit: number = 1;
    return this.httpClient.get<ILanguage[]>([environment.API_URL, 'language', 'getAll'].join('/'), {
      params: new HttpParams().set('limit', limit)});
  }

  getById(id: number){
    return this.httpClient.get<ILanguage>([environment.API_URL, 'language', 'getById'].join('/'), {
      params: new HttpParams().set('id', id)});
  }


  create(name: string): Observable<any>{
    return this.httpClient.post([environment.API_URL, 'language', 'create'].join('/'), name);
  }

  delete(id: number){
    return this.httpClient.delete([environment.API_URL, 'language', 'delete'].join('/'), {
      params: new HttpParams().set('id', id)
    });
  }

  update(language: ILanguage): Observable<any>{
    return this.httpClient.put([environment.API_URL, 'language', 'update'].join('/'), language);
  }
}
