import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { filter, map, Observable, of, take } from "rxjs";
import { LoadPokemonNameAction } from "../../../stores/pokemon/pokemon.action";
import { selectNumberOfPokemons } from "../../../stores/pokemon";

@Component({
  selector: 'app-guessr-wrapper',
  templateUrl: './guessr-wrapper.component.html',
  styleUrls: ['./guessr-wrapper.component.scss']
})
export class GuessrWrapperComponent implements OnInit {

  numberOfPokemons$: Observable<number> = of(0)

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.numberOfPokemons$ = this.store.select(selectNumberOfPokemons)
    this.numberOfPokemons$.pipe(
      filter(numberOfPokemon => numberOfPokemon > 0),
      take(1),
      map(numberOfPokemon => LoadPokemonNameAction({pokemonIndex: numberOfPokemon - 1}))
    ).subscribe(action => this.store.dispatch(action));
  }

}
