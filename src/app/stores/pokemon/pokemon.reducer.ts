import { PokemonInitialState, PokemonState } from "./pokemon.state";
import { createReducer, on } from "@ngrx/store";
import {
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
  LoadPokemonSuccessAction
} from "./pokemon.action";

const onLoadNumberOfPokemonsSuccess = (state: PokemonState, {numberOfPokemons}: { numberOfPokemons: number }) => ({
  ...state,
  numberOfPokemons
});

const onLoadNumberOfPokemonsFailure = (state: PokemonState) => ({...state, numberOfPokemons: 0});

const onLoadPokemonSuccess = (state: PokemonState, {pokemon}: { pokemon: Pokemon }) => ({
  ...state,
  pokemon
});


export const pokemonReducer = createReducer(
  PokemonInitialState,
  on(LoadNumberOfPokemonsSuccessAction, onLoadNumberOfPokemonsSuccess),
  on(LoadNumberOfPokemonsFailureAction, onLoadNumberOfPokemonsFailure),
  on(LoadPokemonSuccessAction, onLoadPokemonSuccess),
);
