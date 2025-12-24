import { createAction, props } from '@ngrx/store';
import { Pokemon } from "../../typings";

const PokemonActionTypes = {
  LOAD_NUMBER_OF_POKEMONS: '[Pokemon] Load number of Pokemons',
  LOAD_NUMBER_OF_POKEMONS_SUCCESS: '[Pokemon] Load number of Pokemons success',
  LOAD_NUMBER_OF_POKEMONS_FAILURE: '[Pokemon] Load number of Pokemons failure',
  LOAD_POKEMON: '[Pokemon] Load pokemon',
  LOAD_POKEMON_SUCCESS: '[Pokemon] Load pokemon success',
  LOAD_POKEMON_FAILURE: '[Pokemon] Load pokemon failure',
  CORRECT_ANSWER: '[Pokemon] A correct answer',
  INCORRECT_ANSWER: '[Pokemon] An incorrect answer',
  SUBMIT_SCORE: '[Pokemon] Submit Score',
  START_GAME: '[Pokemon] Start game',
};


export const LoadNumberOfPokemonsAction = createAction(PokemonActionTypes.LOAD_NUMBER_OF_POKEMONS);
export const LoadNumberOfPokemonsSuccessAction = createAction(PokemonActionTypes.LOAD_NUMBER_OF_POKEMONS_SUCCESS,
  props<{ numberOfPokemons: number }>());
export const LoadNumberOfPokemonsFailureAction = createAction(PokemonActionTypes.LOAD_NUMBER_OF_POKEMONS_FAILURE);

export const LoadPokemonAction = createAction(PokemonActionTypes.LOAD_POKEMON);
export const LoadPokemonSuccessAction = createAction(PokemonActionTypes.LOAD_POKEMON_SUCCESS,
  props<{ pokemon: Pokemon }>());
export const LoadPokemonFailureAction = createAction(PokemonActionTypes.LOAD_POKEMON_FAILURE);

export const SubmitScoreAction = createAction(PokemonActionTypes.SUBMIT_SCORE,
  props<{ score: number }>());
export const StartGameAction = createAction(PokemonActionTypes.START_GAME);
