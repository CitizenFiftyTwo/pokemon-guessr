import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { PokemonService } from "../../services/pokemon.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
  PokemonActionTypes
} from "./pokemon.action";
import { Action } from "@ngrx/store";

@Injectable()
export class PokemonEffects {

  constructor(
    private pokemonService: PokemonService,
    private actions$: Actions
  ) {
  }

  loadNumberOfPokemons$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(PokemonActionTypes.LOAD_NUMBER_OF_POKEMONS),
    mergeMap(() => this.pokemonService.getNumberOfPokemons()
      .pipe(
        map(numberOfPokemons => LoadNumberOfPokemonsSuccessAction({numberOfPokemons})),
        catchError(() => of(LoadNumberOfPokemonsFailureAction()))
      )
    )
  ));
}
