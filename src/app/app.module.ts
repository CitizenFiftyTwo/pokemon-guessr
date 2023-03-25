import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { createTranslateLoader } from "./common/translate.loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { GuessrModule } from "./modules/guessr/guessr.module";
import { StoreModule } from '@ngrx/store';
import { AppInitialState, effects, reducers } from "./app.ngrx";
import { EffectsModule } from "@ngrx/effects";
import { environment } from "../environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GuessrModule,
    StoreModule.forRoot(reducers, {initialState: AppInitialState()}),
    (environment.production ? [] : [StoreDevtoolsModule.instrument({maxAge: 25})]),
    EffectsModule.forRoot(effects),
    TranslateModule.forRoot({
      defaultLanguage: 'fr-FR',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
