import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../../componets/authorization/auth.service";
import {LoginComponent} from "../../componets/authorization/login/login.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router, private dialog: MatDialog) {
  }
  canActivate() {
    if (this.authService.isUserAuth()) {
      return true;
    }
    else{
      this.dialog.open(LoginComponent, {autoFocus: false});
      return false;
    }
  }

}
