import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {LanguageActions} from "./store/actions/language/language.action";
import {LanguageService} from "./service/language/language.service";
import {ILanguage} from "./models/interfaces/language/language.model";
import {CurrentLanguageSelectors} from "./store/selectors/language/current-language.selecters";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';
  currentLanguage!: ILanguage;

  constructor(private translateService: TranslateService, private store: Store, private language: LanguageService) {
    this.language.getAll().subscribe(list =>{
      this.store.dispatch(LanguageActions.addListLanguage({listLanguage: list}));
    });

    this.store.select(CurrentLanguageSelectors.getCurrentLanguageSelector).subscribe(currentLanguage=>{
      if (currentLanguage != null){
        this.language.setCurrentLanguage(currentLanguage);
        translateService.setDefaultLang(currentLanguage);
        translateService.use(currentLanguage);
      }
      else {
        this.language.setCurrentLanguage('en');
        translateService.setDefaultLang('en');
        translateService.use('en');
      }
    });
  }


}
