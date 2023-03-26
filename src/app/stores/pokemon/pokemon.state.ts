import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.ngrx";

export interface PokemonState {
  numberOfPokemons: number,
  pokemonName: string
}

export const PokemonInitialState: PokemonState = {
  numberOfPokemons: 0,
  pokemonName: ''
};

const pokemonState = (state: AppState): PokemonState => state.pokemon as PokemonState;

export const selectNumberOfPokemons = createSelector(pokemonState, (state: PokemonState) =>
  state.numberOfPokemons);

export const selectPokemonName = createSelector(pokemonState, (state: PokemonState) =>
  state.pokemonName);
