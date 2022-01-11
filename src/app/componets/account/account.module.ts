import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AccountService} from "./account.service";
import {AccountComponent} from "./account.component";
import {ProfileComponent} from "./models/profile/profile.component";
import {RouterModule} from "@angular/router";
import {OrderComponent} from "./models/order/order.component";
import {ProfileState} from "../../models/states/profile/profile.state";
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../function/translate/http-loader-factory";
import {MissingTranslationService} from "../../service/translate/missing-translation-service";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {BrowserModule} from "@angular/platform-browser";
import {MatMenuModule} from '@angular/material/menu';
import {ChangePasswordComponent} from "./models/profile/models/change-password/change-password.component";


@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    OrderComponent,
    ChangePasswordComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatMenuModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler:{provide: MissingTranslationHandler, useClass: MissingTranslationService},
      useDefaultLang: false,
    }),
  ],
  providers: [AccountService, ProfileState],
  bootstrap: []
})
export class AccountModule { }
