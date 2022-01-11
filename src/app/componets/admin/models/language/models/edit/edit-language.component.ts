import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {errorObject} from "rxjs/internal-compatibility";
import {Store} from "@ngrx/store";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../../../../../../service/language/language.service";
import {ILanguage} from "../../../../../../models/interfaces/language/language.model";
import {LanguageActions} from "../../../../../../store/actions/language/language.action";
import {LanguageSelectors} from "../../../../../../store/selectors/language/language.selecters";

@Component({
  selector: 'admin-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.css']
})
export class EditLanguageComponent implements OnInit{

  form!: FormGroup;
  tmpLanguage!: ILanguage;

  errors: any;
  errorsFV: any;
  errorZero: string = "The server is down";

  flagErrors: boolean = false;
  flagErrorsFV: boolean = false;
  flagErrorZero: boolean = false;

  get name() { return this.form.get('name');}

  constructor(private languageService: LanguageService,
              private router: Router,
              public dialog: MatDialog,
              private store: Store,
              private translateService: TranslateService) {
    this.store.select(LanguageSelectors.selectCurrentLanguage).subscribe(res => {
      if(res != null && res != 0){
        this.tmpLanguage = res
      }
    })
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(this.tmpLanguage.name,
        [Validators.required])
    });
  }

  getErrorMessageName() {
    return this.name!.hasError('required') ? 'You must enter a value' : '';
  }

  onEditLanguageClick() {
    if (this.form.valid) {
      const {name} = this.form.value;
      const language: ILanguage = {
        id: this.tmpLanguage.id,
        name: name
      }

      console.log("language: ", language);

      this.languageService.update(language).subscribe((res: ILanguage) => {
        if (res != null){
          this.store.dispatch(LanguageActions.updateLanguage({update: {id: res.id, changes: res}}));
          this.dialog.closeAll();
        }

      }, error => {
        if (error.statusText == "Unknown Error"){
          this.flagErrorZero = true;
        }
        if (error.error[0].key != null){
          this.errorsFV = error.error;
          this.flagErrorsFV = true;
        }
        else {
          this.errors = error.error;
          this.flagErrors = true;
        }
      });
    }
  }

  closeWindowAddGoods() {
    this.dialog.closeAll();
  }
}
