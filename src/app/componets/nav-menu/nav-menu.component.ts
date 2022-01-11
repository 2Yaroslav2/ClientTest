import {Component, OnInit} from '@angular/core';
import {AuthService} from "../authorization/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {BasketComponent} from "../basket/basket.component";
import {LoginComponent} from "../authorization/login/login.component";
import {RegistrationComponent} from "../registration/registration.component";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {UserSelectors} from "../../store/selectors/user/user.selector";
import {BasketSelectors} from "../../store/selectors/basket/basket.selectors";
import {LanguageService} from "../../service/language/language.service";
import {CategoryAction} from "../../store/actions/category/category.action";
import {CurrentLanguageActions} from "../../store/actions/language/current-language.action";
import {CurrentLanguageSelectors} from "../../store/selectors/language/current-language.selecters";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  selectedLanguage: string = "";
  languages: {id: string, title: string}[] = [];
  user$!: Observable<any>
  goodsCountInBasket: number = 0;

  constructor(private translateService: TranslateService,
              public authService: AuthService,
              public dialog: MatDialog,
              private store: Store, private language: LanguageService) {
    this.user$ = this.store.select(UserSelectors.getUserSelector);
    this.store.select(BasketSelectors.selectAllBasketGoods).subscribe(items=> this.goodsCountInBasket = items.length);
  }

  ngOnInit(): void {

    // initialize translate service
    this.store.select(CurrentLanguageSelectors.getCurrentLanguageSelector).subscribe(currentLanguage=> {
      if (currentLanguage != null){
        this.selectedLanguage = currentLanguage;
      }
      else {
        this.selectedLanguage = environment.defaultLocale;
      }
    })

    this.translateService.get(environment.locales.map(x => `LANGUAGES.${x.toUpperCase()}`))
      .subscribe(translations => {
        // init dropdown list with TRANSLATED list of languages from config
        this.languages = environment.locales.map(x => {
          return {
            id: x,
            title: translations[`LANGUAGES.${x.toUpperCase()}`],
          };
        });
      });

    // it's also possible (and convenient) to use this.translateService.instant
    // but it could be NOT loaded yet at this moment, OnInit of App.Component
  }

  changeLocale() {
    this.language.setCurrentLanguage(this.selectedLanguage.toLowerCase());
    this.store.dispatch(CurrentLanguageActions.addCurrentLanguage({language: this.selectedLanguage.toLowerCase()}))
    this.store.dispatch(CategoryAction.removeAllCategory());
    this.translateService.use(this.selectedLanguage);
  }


  onOpenDialogBasket():void {
    this.dialog.open(BasketComponent, {autoFocus: false});
  }

  onOpenDialogLogin():void {
    this.dialog.open(LoginComponent, {autoFocus: false});
  }

  onOpenDialogRegistration():void {
    this.dialog.open(RegistrationComponent, {autoFocus: false});
  }

  onLogoutClick({ev}: { ev: any }) {
    ev.stopPropagation();
    this.authService.logout().subscribe();
    // return false;
  }

}
