import * as fromPokemon from './stores/pokemon';
import * as fromSettings from './stores/settings';
import { GlobalEffects } from "./stores/global/global.effect";

export interface AppState {
  pokemon?: fromPokemon.PokemonState;
  settings?: fromSettings.SettingsState;
}

export function AppInitialState(): AppState {
  return {
    pokemon: fromPokemon.PokemonInitialState,
  };
}

export const reducers = {
  pokemon: fromPokemon.pokemonReducer,
  settings: fromSettings.settingsReducer
};

export const effects = [
  GlobalEffects,
  fromPokemon.PokemonEffects
];
