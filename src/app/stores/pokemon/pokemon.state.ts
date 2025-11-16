import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.ngrx";
import { Pokemon } from "../../typings";

export interface PokemonState {
  numberOfPokemons: number,
  pokemon: Pokemon | undefined,
  numberOfCorrectAnswers: number,
  numberOfQuestionsAsked: number

}

export const PokemonInitialState: PokemonState = {
  numberOfPokemons: 0,
  pokemon: undefined,
  numberOfCorrectAnswers: 0,
  numberOfQuestionsAsked: 0
};

const pokemonState = (state: AppState): PokemonState => state.pokemon as PokemonState;

export const selectNumberOfPokemons = createSelector(pokemonState, (state: PokemonState) =>
  state.numberOfPokemons);

export const selectPokemon = createSelector(pokemonState, (state: PokemonState) =>
  state.pokemon);

export const selectNumberOfCorrectAnswers = createSelector(pokemonState, (state: PokemonState) =>
  state.numberOfCorrectAnswers);

export const selectNumberOfQuestionsAsked = createSelector(pokemonState, (state: PokemonState) =>
  state.numberOfQuestionsAsked);
