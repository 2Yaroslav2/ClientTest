import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../function/translate/http-loader-factory";
import {MissingTranslationService} from "../../service/translate/missing-translation-service";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {AdminService} from "./admin.service";
import {AdminComponent} from "./admin.component";
import {MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {DatePipe} from "@angular/common";
import {AdminGoodsModule} from "./models/goods/admin-goods.module";
import {AdminCategoryModule} from "./models/category/admin-category.module";
import {AdminLanguageModule} from "./models/language/admin-language.module";
import {AdminOrderModule} from "./models/order/admin-order.module";
import {AdminGoodsDescriptionModule} from "./models/goods-description/admin-goods-description.module";
import {AdminCloseOrderModule} from "./models/close-order/admin-close-order.module";


@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    AdminGoodsModule,
    AdminCategoryModule,
    AdminLanguageModule,
    AdminOrderModule,
    AdminCloseOrderModule,
    AdminGoodsDescriptionModule,
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
  providers: [AdminService, DatePipe],
  bootstrap: []
})
export class AdminModule { }
