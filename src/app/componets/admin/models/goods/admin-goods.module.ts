import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {DatePipe} from "@angular/common";
import {HttpLoaderFactory} from "../../../../function/translate/http-loader-factory";
import {MissingTranslationService} from "../../../../service/translate/missing-translation-service";
import {AdminGoodsComponent} from "./admin-goods.component";
import {AddGoodsComponent} from "./models/add/add-goods.component";
import {BrowserModule} from "@angular/platform-browser";
import {EditGoodsComponent} from "./models/edit/edit-goods.component";

@NgModule({
  declarations: [
    AdminGoodsComponent,
    AddGoodsComponent,
    EditGoodsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    RouterModule,
    MatPaginatorModule,
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
  providers: [DatePipe],
  bootstrap: []
})
export class AdminGoodsModule { }
