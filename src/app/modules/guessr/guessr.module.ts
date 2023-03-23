import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessrWrapperComponent } from "./guessr-wrapper/guessr-wrapper.component";
import { TranslateModule } from "@ngx-translate/core";
import { PokemonService } from "../../services/pokemon.service";

@NgModule({
  declarations: [
    GuessrWrapperComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: [
    PokemonService
  ]
})
export class GuessrModule {
}
