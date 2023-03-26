import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.ngrx";

export interface PokemonState {
  numberOfPokemons: number,
  pokemonName: string,
  pokemonPictureUrl: string,
  pokemon: Pokemon | undefined
}

export const PokemonInitialState: PokemonState = {
  numberOfPokemons: 0,
  pokemonName: '',
  pokemonPictureUrl: '',
  pokemon: undefined
};

const pokemonState = (state: AppState): PokemonState => state.pokemon as PokemonState;

export const selectNumberOfPokemons = createSelector(pokemonState, (state: PokemonState) =>
  state.numberOfPokemons);

export const selectPokemon = createSelector(pokemonState, (state: PokemonState) =>
  state.pokemon);
