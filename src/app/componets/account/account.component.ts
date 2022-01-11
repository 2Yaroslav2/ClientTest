import { Component } from '@angular/core';
import {ProfileState} from "../../models/states/profile/profile.state";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-cabinet',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(public states: ProfileState, private translateService: TranslateService) {
  }
}
