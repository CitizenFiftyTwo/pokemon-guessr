import { Injectable } from "@angular/core";
import { catchError, forkJoin, map, mergeMap, Observable, of, withLatestFrom } from "rxjs";
import { PokemonService } from "../../services/http/pokemon.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  LoadNumberOfPokemonsAction,
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
  LoadPokemonAction,
  LoadPokemonFailureAction,
  LoadPokemonSuccessAction
} from "./pokemon.action";
import { Action, Store } from "@ngrx/store";
import { selectNumberOfPokemons } from "./pokemon.state";
import { RandomNumberService } from "../../services/random-number.service";

@Injectable()
export class PokemonEffects {

  constructor(
    private pokemonService: PokemonService,
    private randomNumberService: RandomNumberService,
    private actions$: Actions,
    private store: Store
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
    withLatestFrom(this.store.select(selectNumberOfPokemons)),
    mergeMap(([_, numberOfPokemons]) => {
        const randomPokemonId = this.randomNumberService.getRandomNumber(numberOfPokemons);
        const pokemonName = this.pokemonService.getPokemonName(randomPokemonId);
        const pokemonPictureUrl = this.pokemonService.getPokemonPictureUrl(randomPokemonId);
        return forkJoin([pokemonName, pokemonPictureUrl]).pipe(
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
      }
    )
  ));
}
