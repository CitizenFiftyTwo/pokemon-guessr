import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { filter, map, Observable, of, take } from "rxjs";
import { LoadPokemonNameAction } from "../../../stores/pokemon/pokemon.action";
import { selectNumberOfPokemons } from "../../../stores/pokemon";
import { RandomNumberService } from "../../../services/random-number.service";

@Component({
  selector: 'app-guessr-wrapper',
  templateUrl: './guessr-wrapper.component.html',
  styleUrls: ['./guessr-wrapper.component.scss']
})
export class GuessrWrapperComponent implements OnInit {

  numberOfPokemons$: Observable<number> = of(0)

  constructor(private store: Store,
              private randomNumberService: RandomNumberService) {
  }

  ngOnInit(): void {
    this.numberOfPokemons$ = this.store.select(selectNumberOfPokemons)
    this.numberOfPokemons$.pipe(
      filter(numberOfPokemon => numberOfPokemon > 0),
      take(1),
      map(numberOfPokemon =>
        LoadPokemonNameAction({pokemonId: this.randomNumberService.getRandomNumber(numberOfPokemon)}))
    ).subscribe(action => this.store.dispatch(action));
  }

}
