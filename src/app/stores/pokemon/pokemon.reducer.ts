import { PokemonInitialState, PokemonState } from "./pokemon.state";
import { createReducer, on } from "@ngrx/store";
import {
  CorrectAnswerAction,
  IncorrectAnswerAction,
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
  LoadPokemonAction,
  LoadPokemonSuccessAction
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

const onCorrectAnswer = (state: PokemonState) => (
  {
    ...state,
    numberOfCorrectAnswers: state.numberOfCorrectAnswers + 1,
    numberOfQuestionsAsked: state.numberOfQuestionsAsked + 1
  });

const onIncorrectAnswer = (state: PokemonState) => (
  {
    ...state,
    numberOfQuestionsAsked: state.numberOfQuestionsAsked + 1
  });


export const pokemonReducer = createReducer(
  PokemonInitialState,
  on(LoadNumberOfPokemonsSuccessAction, onLoadNumberOfPokemonsSuccess),
  on(LoadNumberOfPokemonsFailureAction, onLoadNumberOfPokemonsFailure),
  on(LoadPokemonAction, onLoadPokemon),
  on(LoadPokemonSuccessAction, onLoadPokemonSuccess),
  on(CorrectAnswerAction, onCorrectAnswer),
  on(IncorrectAnswerAction, onIncorrectAnswer)
);
