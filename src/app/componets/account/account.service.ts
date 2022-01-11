import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IChangePassword, IUser} from "../../models/interfaces/user/user.model";

@Injectable()
export class AccountService {
  constructor(private httpClient:HttpClient ) {
  }


  changeContacts(userData: IUser){
    return this.httpClient.put([environment.API_URL, 'user', 'updateContacts'].join('/'), userData);
  }

  changeLogin(userData: IUser){
    return this.httpClient.put([environment.API_URL, 'user', 'updateLogin'].join('/'), userData);
  }

  changePersonalData(userData: IUser){
    return this.httpClient.put([environment.API_URL, 'user', 'updatePersonalData'].join('/'), userData);
  }

  changePassword(changePassword: IChangePassword){
    return this.httpClient.put([environment.API_URL, 'user', 'updatePassword'].join('/'), changePassword);
  }

}
