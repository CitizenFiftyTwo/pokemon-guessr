import { PokemonInitialState, PokemonState } from "./pokemon.state";
import { createReducer, on } from "@ngrx/store";
import {
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
  LoadPokemonNameSuccessAction
} from "./pokemon.action";

const onLoadNumberOfPokemonsSuccess = (state: PokemonState, {numberOfPokemons}: { numberOfPokemons: number }) => ({
  ...state,
  numberOfPokemons
});

const onLoadNumberOfPokemonsFailure = (state: PokemonState) => ({...state, numberOfPokemons: undefined});

const onLoadPokemonNameSuccess = (state: PokemonState, {pokemonName}: { pokemonName: string }) => ({
  ...state,
  pokemonName
});

export const pokemonReducer = createReducer(
  PokemonInitialState,
  on(LoadNumberOfPokemonsSuccessAction, onLoadNumberOfPokemonsSuccess),
  on(LoadNumberOfPokemonsFailureAction, onLoadNumberOfPokemonsFailure),
  on(LoadPokemonNameSuccessAction, onLoadPokemonNameSuccess),
);
