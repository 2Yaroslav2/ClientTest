import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MatDialog} from "@angular/material/dialog";
import {errorObject} from "rxjs/internal-compatibility";
import {UserActions} from "../../../store/actions/user/user.action";
import {Store} from "@ngrx/store";
import {RegistrationComponent} from "../../registration/registration.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form!: FormGroup;
  hide = true;
  myError!: any;
  flagError: boolean = false;
  errors: string = "The server is down";
  flagErrorZero: boolean = false;

  get login() { return this.form.get('login');}
  get password() { return this.form.get('password');}

  constructor(private authService: AuthService,
              private router: Router,
              public dialog: MatDialog,
              private store: Store,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'login': new FormControl('user04@gmail.com',
        [Validators.required, Validators.email, Validators.maxLength(40)]),
      'password':new FormControl('Test1234',
        [Validators.required, Validators.minLength(3), Validators.maxLength(36)])
    });
  }

  getErrorMessageLogin() {
    if (this.login!.hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.login!.hasError('maxlength')){
      return 'Not a valid max length';
    }
    return this.login!.hasError('email') ? 'Not a valid email' : '';

  }

  getErrorMessagePassword() {
    if (this.password!.hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.password!.hasError('maxlength')){
      return 'Not a valid max length';
    }
    else if( this.password!.hasError('minlength')){
      return 'Not a valid min length';
    }
    else {
      return 'other invalid';
    }

  }

  onLoginClick() {
    if (this.form.valid) {
      const { login, password } = this.form.value;
      this.authService.login(login, password).subscribe((res) => {
        this.store.dispatch(UserActions.loadUser({userData: {
            id: res.id,
            userName: res.userName,
            email: res.email,
            role: res.role
          }}));
        this.dialog.closeAll();
        this.router.navigate(['/']);
      }, error => {

        if (error.statusText == "Unknown Error"){
          this.flagErrorZero = true;
        }
        else {
          this.myError = error;
          this.flagError = true;
        }
        // console.log("error ",error);
      });
    }
  }

  openRegistration() {
    this.dialog.closeAll();
    this.dialog.open(RegistrationComponent, {autoFocus: false});
  }

  closeWindowLogin() {
    this.dialog.closeAll();
  }
}
