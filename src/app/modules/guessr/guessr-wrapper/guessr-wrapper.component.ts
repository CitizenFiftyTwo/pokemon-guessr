import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../../../services/pokemon.service";
import { of } from "rxjs";

@Component({
  selector: 'app-guessr-wrapper',
  templateUrl: './guessr-wrapper.component.html',
  styleUrls: ['./guessr-wrapper.component.scss']
})
export class GuessrWrapperComponent implements OnInit {

  numberOfPokemons$ = of(0)

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.numberOfPokemons$ = this.pokemonService.getTotalNumberOfPokemons();
  }
}
