import { createAction, props } from '@ngrx/store';

export const PokemonActionTypes = {
  LOAD_NUMBER_OF_POKEMONS: '[Pokemon] Load number of Pokemons',
  LOAD_NUMBER_OF_POKEMONS_SUCCESS: '[Pokemon] Load number of Pokemons success',
  LOAD_NUMBER_OF_POKEMONS_FAILURE: '[Pokemon] Load number of Pokemons failure',
  LOAD_POKEMON_NAME: '[Pokemon] Load pokemon name',
  LOAD_POKEMON_NAME_SUCCESS: '[Pokemon] Load pokemon name success',
  LOAD_POKEMON_NAME_FAILURE: '[Pokemon] Load pokemon name failure'
};


export const LoadNumberOfPokemonsAction = createAction(PokemonActionTypes.LOAD_NUMBER_OF_POKEMONS);
export const LoadNumberOfPokemonsSuccessAction = createAction(PokemonActionTypes.LOAD_NUMBER_OF_POKEMONS_SUCCESS,
  props<{ numberOfPokemons: number }>());
export const LoadNumberOfPokemonsFailureAction = createAction(PokemonActionTypes.LOAD_NUMBER_OF_POKEMONS_FAILURE);

export const LoadPokemonNameAction = createAction(PokemonActionTypes.LOAD_POKEMON_NAME,
  props<{ pokemonId: number }>());
export const LoadPokemonNameSuccessAction = createAction(PokemonActionTypes.LOAD_POKEMON_NAME_SUCCESS,
  props<{ pokemonName: string }>());
export const LoadPokemonNameFailureAction = createAction(PokemonActionTypes.LOAD_POKEMON_NAME_FAILURE);
