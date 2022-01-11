import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../../service/user/registration/registration.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../authorization/login/login.component";
import {IUserRegistrationData} from "../../models/interfaces/user/user.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  form! : FormGroup;

  hidePassword = true;
  hidePasswordConfirm = true;

  newUser!: IUserRegistrationData;

  errors: any;
  errorsFV: any;
  errorZero: string = "The server is down";

  flagErrors: boolean = false;
  flagErrorsFV: boolean = false;
  flagErrorZero: boolean = false;

  get name() { return this.form.get('name');}
  get password() { return this.form.get('password');}
  get passwordConfirm() { return this.form.get('passwordConfirm');}
  get email() { return this.form.get('email');}

  // password - Test123

  constructor(private registrationService : RegistrationService, private  router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl('user03',
        [Validators.required, Validators.minLength(3), Validators.maxLength(36)]),
      'password' : new FormControl('Test123',
        [Validators.required, Validators.minLength(6), Validators.maxLength(36)]),
      'passwordConfirm' : new FormControl('123456',
        [Validators.required, Validators.minLength(6), Validators.maxLength(36)]),
      'email': new FormControl('user02@gmail.com',
        [Validators.required, Validators.email, Validators.maxLength(40)])
    });
  }

  getErrorMessageName() {
    if (this.name!.hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.name!.hasError('maxlength')){
      return 'Not a valid max length';
    }
    else if( this.name!.hasError('minlength')){
      return 'Not a valid min length';
    }
    else {
      return 'other invalid';
    }
  }

  getErrorMessageEmail() {
    if (this.email!.hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.email!.hasError('maxlength')){
      return 'Not a valid max length';
    }
    return this.email!.hasError('email') ? 'Not a valid email' : '';

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

  getErrorMessagePasswordConfirm() {
    if (this.passwordConfirm!.hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.passwordConfirm!.hasError('maxlength')){
      return 'Not a valid max length';
    }
    else if( this.passwordConfirm!.hasError('minlength')){
      return 'Not a valid min length';
    }
    else {
      return 'other invalid';
    }
  }

  onSave() : void {
    if(this.form.valid){
      const data = this.form.getRawValue();

      this.newUser = {
        userName : data.name,
        email : data.email,
        password : data.password,
        passwordConfirm : data.passwordConfirm
      }

      this.registrationService.addUser(this.newUser).subscribe(()=>{
        this.router.navigate(['/']);
        this.dialog.closeAll();
        this.dialog.open(LoginComponent, {autoFocus: false});
      }, error => {
        if (error.statusText == "Unknown Error"){
          this.flagErrorZero = true;
        }
        if (error.error[0].key != null){
          this.errorsFV = error.error;
          this.flagErrorsFV = true;
        }
        else {
          this.errors = error.error;
          this.flagErrors = true;
        }
      });
    }

  }

  closeWindowRegistration() {
    this.dialog.closeAll();
  }

  openLogin() {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, {autoFocus: false});
  }
}
