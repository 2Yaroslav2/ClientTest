import { Component } from '@angular/core';
import {ProfileState} from "../../models/states/profile/profile.state";
import {TranslateService} from "@ngx-translate/core";
import {CategoryAction} from "../../store/actions/category/category.action";
import {CategorySelectors} from "../../store/selectors/category/category.selectors";
import {MatTableDataSource} from "@angular/material/table";
import {Store} from "@ngrx/store";
import {CategoryService} from "../../service/category/category.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private translateService: TranslateService, private store: Store) {
  }

}
