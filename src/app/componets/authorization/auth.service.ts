import {Injectable} from "@angular/core";
import {BehaviorSubject, of, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {UserActions} from "../../store/actions/user/user.action";
import {Store} from "@ngrx/store";
import {LOGIN_KEY} from "../../shared/key/any.key";

@Injectable()
export class AuthService {

  isUserAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private httpClient: HttpClient, private  store: Store) {
    // this.isUserAuth$.next(Boolean(localStorage.getItem(LOGIN_KEY)))
  }


  login(login: string, password: string){
    return this.httpClient.post<{id: string, userName: string, email: string, role: string}>(
      [environment.API_URL, 'auth', 'login'].join('/'), {login, password})
      .pipe(tap(res =>{
        // localStorage.setItem(LOGIN_KEY, res.id);
        this.isUserAuth$.next(true);
      }));
  }


  logout(){
        // TODO: Server logout
    // return of([]).pipe(tap(() => {
    //   // очистка данных в LocalStorage
    //   localStorage.removeItem(this.LOGIN_KEY);
    //
    //   // уведомление об выходе пользователя
    //   this.isUserAuth$.next(false);
    //   this.router.navigate(['/']);
    // }))
    return this.httpClient.post([environment.API_URL, 'auth', 'logout'].join('/'), '').pipe(tap(() => {
      // очистка данных в LocalStorage
      localStorage.removeItem(LOGIN_KEY);
      this.store.dispatch(UserActions.logoutUser());
      // уведомление об выходе пользователя
      this.isUserAuth$.next(false);
      this.router.navigate(['/']);
    }))
  }

  isUserAuth(): boolean{

    return this.isUserAuth$.getValue();
  }
}
