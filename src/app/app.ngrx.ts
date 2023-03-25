import * as fromPokemon from './stores/pokemon'

export interface AppState {
  pokemon?: fromPokemon.PokemonState;
}

export function AppInitialState(): AppState {
  return {
    pokemon: fromPokemon.PokemonInitialState,
  };
}

export const reducers = {
  pokemon: fromPokemon.pokemonReducer
};

export const effects = [
  fromPokemon.PokemonEffects
];
