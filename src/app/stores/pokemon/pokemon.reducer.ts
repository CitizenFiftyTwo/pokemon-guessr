import { PokemonInitialState, PokemonState } from "./pokemon.state";
import { createReducer, on } from "@ngrx/store";
import {
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
  LoadPokemonAction,
  LoadPokemonSuccessAction,
  StartGameAction,
  SubmitScoreAction
} from "./pokemon.action";
import { Pokemon } from "../../typings";

const onLoadNumberOfPokemonsSuccess = (state: PokemonState, {numberOfPokemons}: { numberOfPokemons: number }) => ({
  ...state,
  numberOfPokemons
});

const onLoadNumberOfPokemonsFailure = (state: PokemonState) => ({...state, numberOfPokemons: 0});

const onLoadPokemon = (state: PokemonState) => ({...state, pokemon: undefined});
const onLoadPokemonSuccess = (state: PokemonState, {pokemon}: { pokemon: Pokemon }) => ({
  ...state,
  pokemon
});

const onSubmitScore = (state: PokemonState, {score}: { score: number }) => ({
  ...state,
  score: state.score + score,
  numberOfQuestionsAsked: state.numberOfQuestionsAsked + 1
});

const onStartGameAction = (state: PokemonState) => (
  {
    ...state,
    score: 0,
    numberOfQuestionsAsked: 0
  });


export const pokemonReducer = createReducer(
  PokemonInitialState,
  on(LoadNumberOfPokemonsSuccessAction, onLoadNumberOfPokemonsSuccess),
  on(LoadNumberOfPokemonsFailureAction, onLoadNumberOfPokemonsFailure),
  on(LoadPokemonAction, onLoadPokemon),
  on(LoadPokemonSuccessAction, onLoadPokemonSuccess),
  on(SubmitScoreAction, onSubmitScore),
  on(StartGameAction, onStartGameAction)
);
