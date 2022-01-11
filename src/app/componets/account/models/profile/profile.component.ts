import {Component, OnInit} from '@angular/core';
import {ProfileState} from "../../../../models/states/profile/profile.state";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../account.service";
import {Store} from "@ngrx/store";
import {UserSelectors} from "../../../../store/selectors/user/user.selector";
import {IUser} from "../../../../models/interfaces/user/user.model";
import {UserActions} from "../../../../store/actions/user/user.action";
import {ChangePasswordComponent} from "./models/change-password/change-password.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  formProfileData!: FormGroup;
  formContacts!: FormGroup;
  formLogin!: FormGroup;

  user!: IUser;
  errors: any;
  errorsFV: any;


  get name() { return this.formProfileData.get('name'); }
  get emailFormContacts() { return this.formContacts.get('email'); }
  get login() { return this.formLogin.get('email'); }

  constructor(public states: ProfileState,
              private accountService: AccountService,
              private store: Store,
              public dialog: MatDialog) {

    this.store.select(UserSelectors.getUserSelector).subscribe(userData=>{this.user = userData});
  }

  ngOnInit(): void {
      this.formProfileData = new FormGroup({
        'name': new FormControl(this.user.userName,
          [Validators.required, Validators.minLength(3), Validators.maxLength(36)]),
      });
      this.formContacts = new FormGroup({
        'email': new FormControl('user02@gmail.com',
          [Validators.required, Validators.email, Validators.maxLength(40)])
      });
      this.formLogin = new FormGroup({
        'email': new FormControl(this.user.email,
          [Validators.required, Validators.email, Validators.maxLength(40)])
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

  getErrorMessageEmail() {
    if (this.emailFormContacts!.hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.emailFormContacts!.hasError('maxlength')){
      return 'Not a valid max length';
    }
    return this.emailFormContacts!.hasError('email') ? 'Not a valid email' : '';

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


  saveNewProfileData() {
    const name = this.formProfileData.get('name')?.value;

    let tmpUser: IUser ={
      ...this.user,
      userName: name
    }

    this.accountService.changePersonalData(tmpUser).subscribe((user)=>{
      if ((user as IUser) != null){
        this.store.dispatch(UserActions.loadUser({userData: (user as IUser)}));
        this.states.editPersonalDataSuccessful();
      }
    }, (error)=>{

      if (error.error[0].key != null){
        console.log("error: ", error);
        this.errorsFV = error.error;
        this.states.errorFVPersonalData();
      }
      else {
        this.errors = error.error;
        this.states.errorPersonalData();
      }
    });

  }

  saveNewContacts() {
    const  email = this.formContacts.get('email')?.value;

    let tmpUser : IUser = {
      ...this.user,
      email: email
    }

    this.accountService.changeContacts(tmpUser).subscribe((user)=>{
      if ((user as IUser) != null){
        this.store.dispatch(UserActions.loadUser({userData: (user as IUser)}));
        this.states.editContactsSuccessful();
      }
    }, (error)=>{

      if (error.error[0].key != null){
        this.errorsFV = error.error;
        this.states.errorFVContacts();
      }
      else {
        this.errors = error.error;
        this.states.errorContacts();
      }
    });
  }

  saveNewLogin() {
    const  email = this.formContacts.get('email')?.value;

    let tmpUser : IUser = {
      ...this.user,
      email: email
    }

    this.accountService.changeLogin(tmpUser).subscribe((user)=>{
      if ((user as IUser) != null){
        this.store.dispatch(UserActions.loadUser({userData: (user as IUser)}));
        this.states.editLoginSuccessful();
      }
    }, (error)=>{

      if (error.error[0].key != null){
        console.log("error: ", error.error.value);
        this.errorsFV = error.error;
        this.states.errorFVLogin();
      }
      else {
        this.errors = error.error;
        this.states.errorLogin();
      }
    });
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent, {autoFocus: false});
  }
}
