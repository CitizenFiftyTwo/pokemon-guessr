import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { PokemonService } from "../../services/pokemon.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  LoadNumberOfPokemonsAction,
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
  LoadPokemonNameAction,
  LoadPokemonNameSuccessAction
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
    ofType(LoadNumberOfPokemonsAction),
    mergeMap(() => this.pokemonService.getNumberOfPokemons()
      .pipe(
        map(numberOfPokemons => LoadNumberOfPokemonsSuccessAction({numberOfPokemons})),
        catchError(() => of(LoadNumberOfPokemonsFailureAction()))
      )
    )
  ));

  loadPokemonName$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(LoadPokemonNameAction),
    mergeMap((action) => this.pokemonService.getPokemonName(action.pokemonIndex)
      .pipe(
        // TODO: Handle undefined
        map(pokemonName => LoadPokemonNameSuccessAction({pokemonName: pokemonName || ''})),
        catchError(() => of(LoadNumberOfPokemonsFailureAction()))
      )
    )
  ));
}
