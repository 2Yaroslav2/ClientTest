import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {RouterLinkWithHref} from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FooterComponent} from "./componets/footer/footer.component";
import {NavMenuComponent} from "./componets/nav-menu/nav-menu.component";
import {HomeComponent} from "./componets/home/home.component";
import {ErrorComponent} from "./componets/error/error.component";
import {AuthModule} from "./componets/authorization/auth.module";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {ReactiveFormsModule} from "@angular/forms";
import {AccountModule} from "./componets/account/account.module";
import {AboutComponent} from "./componets/about/about.component";
import {RegistrationComponent} from "./componets/registration/registration.component";
import {BasketComponent} from "./componets/basket/basket.component";
import {LibraryComponent} from "./componets/library/library.component";
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MatFormFieldModule} from '@angular/material/form-field';

import {HttpLoaderFactory} from "./function/translate/http-loader-factory";
import {MissingTranslationService} from "./service/translate/missing-translation-service";
import {RegistrationService} from "./service/user/registration/registration.service";
import {ShopComponent} from "./componets/shop/shop.component";
import {BasketService} from "./service/basket/basket.service";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {reducers} from "./store";
import {GoodsService} from "./service/goods/goods.service";
import {MoreGoodsInfoComponent} from "./componets/shop/more-goods-info/more-goods-info.component";
import {CategoryService} from "./service/category/category.service";
import {AdminModule} from "./componets/admin/admin.module";
import {metaReducers} from "./store/reducers/meta-reducers/meta.reducer";
import {LanguageService} from "./service/language/language.service";
import {GoodsDescriptionService} from "./service/goods-description/goods-description.service";
import {AuthGuard} from "./shared/guards/auth.guard";
import {YouTubePlayerModule} from "@angular/youtube-player";
import {NgxAudioPlayerModule} from "ngx-audio-player";
import {LibraryModule} from "./componets/library/library.module";




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ErrorComponent,
    FooterComponent,
    AboutComponent,
    RegistrationComponent,
    BasketComponent,
    LibraryComponent,
    ShopComponent,
    MoreGoodsInfoComponent,
  ],
  imports: [
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler:{provide: MissingTranslationHandler, useClass: MissingTranslationService},
      useDefaultLang: false,
    }),
    AuthModule,
    AccountModule,
    AdminModule,
    HttpClientModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    LibraryModule,
    RouterModule,
    YouTubePlayerModule,
    NgxAudioPlayerModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    RegistrationService,
    GoodsService,
    BasketService,
    CategoryService,
    LanguageService,
    GoodsDescriptionService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
