import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {IUserRegistrationData} from "../../../models/interfaces/user/user.model";

@Injectable()
export class RegistrationService {

  constructor(private httpClient : HttpClient) {
  }

  addUser(user: IUserRegistrationData) {
    return this.httpClient.post([environment.API_URL, 'registration', 'create'].join('/'), user);
  }
}
