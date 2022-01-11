import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../../account.service";
import {IChangePassword} from "../../../../../../models/interfaces/user/user.model";
import {Store} from "@ngrx/store";
import {UserSelectors} from "../../../../../../store/selectors/user/user.selector";
import {ProfileState} from "../../../../../../models/states/profile/profile.state";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
  errors: any;
  errorsFV: any;

  flagErrors: boolean = false;
  flagErrorsFV: boolean = false;

  form!: FormGroup;
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideNewConfirmPassword: boolean = true;

  changePassword!: IChangePassword;

  get newPassword() { return this.form.get('newPassword');}
  get newConfirmPassword() { return this.form.get('newConfirmPassword');}
  get oldPassword() { return this.form.get('oldPassword');}

  constructor(public dialog: MatDialog,
              private accountService: AccountService,
              private store: Store,
              public states: ProfileState) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'oldPassword':new FormControl('Test123',
        [Validators.required, Validators.minLength(3), Validators.maxLength(36)]),
      'newPassword':new FormControl( 'Test1234',
        [Validators.required, Validators.minLength(3), Validators.maxLength(36)]),
      'newConfirmPassword':new FormControl('Test1234',
        [Validators.required, Validators.minLength(3), Validators.maxLength(36)])
    });
  }

  closeWindowChangePassword() {
    this.dialog.closeAll();
  }

  getErrorMessageOldPassword() {
    if (this.oldPassword!.hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.oldPassword!.hasError('maxlength')){
      return 'Not a valid max length';
    }
    else if( this.oldPassword!.hasError('minlength')){
      return 'Not a valid min length';
    }
    else {
      return 'other invalid';
    }
  }

  getErrorMessageNewPassword() {
    if (this.newPassword!.hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.newPassword!.hasError('maxlength')){
      return 'Not a valid max length';
    }
    else if( this.newPassword!.hasError('minlength')){
      return 'Not a valid min length';
    }
    else {
      return 'other invalid';
    }
  }

  getErrorMessageNewConfirmPassword() {
    if (this.newConfirmPassword!.hasError('required')) {
      return 'You must enter a value';
    }
    else if(this.newConfirmPassword!.hasError('maxlength')){
      return 'Not a valid max length';
    }
    else if( this.newConfirmPassword!.hasError('minlength')){
      return 'Not a valid min length';
    }
    else {
      return 'other invalid';
    }
  }

  onSave() {
    if (this.form.valid){
      const { oldPassword, newPassword, newConfirmPassword } = this.form.value;
      this.store.select(UserSelectors.getUserSelector).subscribe(user=>{
        this.accountService.changePassword( {
          id: user.id,
          newPassword: newPassword,
          newPasswordConfirm: newConfirmPassword,
          oldPassword: oldPassword
        }).subscribe(res =>{
          if (res as boolean){
            this.states.changePassword();
            this.dialog.closeAll();

          }},error => {
          console.log("error:",error);
          if (error.error[0].key != null){
            this.errorsFV = error.error;
            this.flagErrorsFV = true;
          }
          else {
            this.errors = error.error;
            this.flagErrors = true;
          }
        });
      });
    }

  }
}
