import { createAction, props } from '@ngrx/store';

export const PokemonActionTypes = {
  LOAD_NUMBER_OF_POKEMONS: '[Pokemon] Load number of Pokemons',
  LOAD_NUMBER_OF_POKEMONS_SUCCESS: '[Pokemon] Load number of Pokemons success',
  LOAD_NUMBER_OF_POKEMONS_FAILURE: '[Pokemon] Load number of Pokemons failure'
};


export const LoadNumberOfPokemonsAction = createAction(PokemonActionTypes.LOAD_NUMBER_OF_POKEMONS);
export const LoadNumberOfPokemonsSuccessAction = createAction(PokemonActionTypes.LOAD_NUMBER_OF_POKEMONS_SUCCESS,
  props<{ numberOfPokemons: number }>());
export const LoadNumberOfPokemonsFailureAction = createAction(PokemonActionTypes.LOAD_NUMBER_OF_POKEMONS_FAILURE);
