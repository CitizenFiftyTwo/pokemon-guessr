import { Injectable } from "@angular/core";
import { catchError, forkJoin, map, mergeMap, Observable, of } from "rxjs";
import { PokemonService } from "../../services/pokemon.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  LoadNumberOfPokemonsAction,
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
  LoadPokemonAction,
  LoadPokemonFailureAction,
  LoadPokemonSuccessAction
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

  loadPokemon$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(LoadPokemonAction),
    mergeMap((action) =>
      forkJoin([
        this.pokemonService.getPokemonName(action.pokemonId),
        this.pokemonService.getPokemonPictureUrl(action.pokemonId)]).pipe(
        map(([name, pictureUrl]) => {
          return LoadPokemonSuccessAction({
            pokemon: {
              name,
              pictureUrl
            }
          })
        }),
        catchError(() => of(LoadPokemonFailureAction))
      )
    )
  ));
}
