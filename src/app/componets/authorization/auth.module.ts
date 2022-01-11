import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import {LoginComponent} from "./login/login.component";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import { BrowserModule } from '@angular/platform-browser';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../function/translate/http-loader-factory";
import {HttpClient} from "@angular/common/http";
import {MissingTranslationService} from "../../service/translate/missing-translation-service";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
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
  providers: [AuthService],
  bootstrap: []
})
export class AuthModule { }
