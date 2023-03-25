import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.ngrx";

export interface PokemonState {
  numberOfPokemons: number | undefined
}

export const PokemonInitialState: PokemonState = {
  numberOfPokemons: undefined
};

const pokemonState = (state: AppState): PokemonState => state.pokemon as PokemonState;

export const selectNumberOfPokemons = createSelector(pokemonState, (state: PokemonState) => {
  return state.numberOfPokemons
});
