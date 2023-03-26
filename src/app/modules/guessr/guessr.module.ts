import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessrWrapperComponent } from "./guessr-wrapper/guessr-wrapper.component";
import { TranslateModule } from "@ngx-translate/core";
import { PokemonService } from "../../services/pokemon.service";
import { RandomNumberService } from "../../services/random-number.service";
import { GuessrInputComponent } from './guessr-wrapper/guessr-input/guessr-input.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    GuessrWrapperComponent,
    GuessrInputComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  providers: [
    PokemonService,
    RandomNumberService
  ]
})
export class GuessrModule {
}
