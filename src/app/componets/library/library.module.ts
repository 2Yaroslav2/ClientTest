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
import {MatTableModule} from '@angular/material/table';
import {YouTubePlayerModule} from "@angular/youtube-player";
import {NgxAudioPlayerModule} from "ngx-audio-player";
import {DictionaryComponent} from "./models/dictionary/dictionary.component";
import {VideoComponent} from "./models/video/video.component";
import {AudioComponent} from "./models/audio/audio.component";
import {BookComponent} from "./models/book/book.component";
import {CourseComponent} from "./models/course/course.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    DictionaryComponent,
    VideoComponent,
    AudioComponent,
    BookComponent,
    CourseComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    YouTubePlayerModule,
    NgxAudioPlayerModule,
    MatPaginatorModule,
    MatSortModule,
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
  providers: [],
  bootstrap: []
})
export class LibraryModule { }
