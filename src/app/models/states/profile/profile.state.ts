export class ProfileState {
  states = {
    'Profile': true,
    'Orders': false,
    'ProfileIconAvatar': true,
    'OrdersIconAvatar': false,
    'EditPersonalDataInput': true,
    'EditContactsInput': true,
    'EditLoginInput': true,
    'EditPersonalDataP': false,
    'EditContactsP': false,
    'EditLoginP': false,
    'ErrorContacts': true,
    'ErrorFVContacts': true,
    'ErrorLogin': true,
    'ErrorFVLogin': true,
    'ErrorPersonalData': true,
    'ErrorFVPersonalData': true,
    'EditPersonalDataSuccess': true,
    'EditContactsSuccess': true,
    'EditLoginSuccess': true,
    'ChangePassword': true
  }

  selectProfile(){
    this.states.Profile = true;
    this.states.Orders = false;
    this.states.ProfileIconAvatar = true
    this.states.OrdersIconAvatar = false;
  }

  selectOrder(){
    this.states.Profile = false;
    this.states.Orders = true;
    this.states.ProfileIconAvatar = false;
    this.states.OrdersIconAvatar = true;
  }

  selectEditProfileData(){
    this.states.EditPersonalDataP = !this.states.EditPersonalDataP;
    this.states.EditPersonalDataInput = !this.states.EditPersonalDataInput;
  }
  selectEditContacts(){
    this.states.EditContactsP = !this.states.EditContactsP;
    this.states.EditContactsInput = !this.states.EditContactsInput;
  }
  selectEditLogin(){
    this.states.EditLoginP = !this.states.EditLoginP;
    this.states.EditLoginInput = !this.states.EditLoginInput ;
  }

  errorContacts(){
    this.states.ErrorContacts = false;
  }

  errorFVContacts(){
    this.states.ErrorFVContacts = false;
  }

  errorLogin(){
    this.states.ErrorLogin = false;
  }

  errorFVLogin(){
    this.states.ErrorFVLogin = false;
  }

  errorPersonalData(){
    this.states.ErrorPersonalData = false;
  }

  errorFVPersonalData(){
    this.states.ErrorFVPersonalData = false;
  }

  editContactsSuccessful(){
    this.states.EditContactsSuccess = false;
    this.states.ErrorContacts = true;
    this.selectEditContacts();
  }

  editLoginSuccessful(){
    this.states.EditLoginSuccess = false;
    this.states.ErrorLogin = true;
    this.selectEditLogin();
  }

  editPersonalDataSuccessful(){
    this.states.EditPersonalDataSuccess = false;
    this.states.ErrorPersonalData = true;
    this.selectEditProfileData();
  }

  changePassword(){
    this.states.ChangePassword = false;
  }

}
