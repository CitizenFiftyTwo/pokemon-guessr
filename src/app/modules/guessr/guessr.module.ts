import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessrWrapperComponent } from "./guessr-wrapper/guessr-wrapper.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    GuessrWrapperComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class GuessrModule {
}
