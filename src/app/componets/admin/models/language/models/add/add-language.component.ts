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

@Component({
  selector: 'admin-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})
export class AddLanguageComponent implements OnInit{

  form!: FormGroup;

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
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl('new language',
        [Validators.required])
    });
  }

  getErrorMessageName() {
    return this.name!.hasError('required') ? 'You must enter a value' : '';
  }

  onAddLanguageClick() {
    if (this.form.valid) {
      const name = this.form.value;

      this.languageService.create(name).subscribe((res: ILanguage) => {
        if (res != null){
          this.store.dispatch(LanguageActions.addLanguage({language: res}));
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
