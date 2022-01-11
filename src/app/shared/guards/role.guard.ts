import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../../componets/authorization/auth.service";
import {Store} from "@ngrx/store";
import {UserActions} from "../../store/actions/user/user.action";
import {UserSelectors} from "../../store/selectors/user/user.selector";

@Injectable()
export class RoleGuard implements CanActivate {
  role!: any;
  constructor(private store: Store,
              private router: Router) {
    this.store.select(UserSelectors.getUserSelector).subscribe(user=> this.role = user.role);
  }
  canActivate() {
    if (this.role == 'admin') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
