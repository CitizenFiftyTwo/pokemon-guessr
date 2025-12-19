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
import { SettingsModule } from "./modules/settings/settings.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { providePrimeNG } from "primeng/config";
import Aura from '@primeng/themes/aura';
import { definePreset } from "@primeng/themes";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{red.100}',
      200: '{red.200}',
      300: '{red.300}',
      400: '{red.400}',
      500: '{red.500}',
      600: '{red.600}',
      700: '{red.700}',
      800: '{red.800}',
      900: '{red.900}',
      950: '{red.950}'
    }
  }
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    GuessrModule,
    SettingsModule,
    StoreModule.forRoot(reducers, {initialState: AppInitialState()}),
    (environment.production ? [] : [StoreDevtoolsModule.instrument({maxAge: 25, connectInZone: true})]),
    EffectsModule.forRoot(effects),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false
        }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
