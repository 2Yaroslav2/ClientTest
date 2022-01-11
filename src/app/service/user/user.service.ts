import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class UserService {

  constructor(private httpClient : HttpClient) {
  }

  update(user: any) {
    return this.httpClient.put([environment.API_URL, 'registration', 'create'].join('/'), user);
  }
}
