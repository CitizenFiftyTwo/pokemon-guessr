import { PokemonInitialState, PokemonState } from "./pokemon.state";
import { pokemonReducer } from "./pokemon.reducer";
import { INIT } from "@ngrx/store";
import {
  CorrectAnswerAction,
  IncorrectAnswerAction,
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
  LoadPokemonAction,
  LoadPokemonSuccessAction
} from "./pokemon.action";

describe('PokemonReducer', () => {
  let initialState: PokemonState;

  beforeEach(() => {
    initialState = PokemonInitialState;
  });

  it('should initialize the store', () => {
    const state = pokemonReducer(undefined, {type: INIT});

    expect(state).toEqual(PokemonInitialState);
  });

  it('LoadNumberOfPokemonsSuccessAction should update number of pokemons', () => {
    const action = LoadNumberOfPokemonsSuccessAction({numberOfPokemons: 151});

    const state = pokemonReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      numberOfPokemons: 151
    });
  });

  it('LoadNumberOfPokemonsFailureAction should reset number of pokemons', () => {
    const action = LoadNumberOfPokemonsFailureAction();
    const stateWithNumberOfPokemons = {
      ...initialState,
      numberOfPokemons: 151
    };

    const state = pokemonReducer(stateWithNumberOfPokemons, action);

    expect(state).toEqual(PokemonInitialState);
  });

  it('LoadPokemonAction should reset pokemon', () => {
    const pokemon = {
      name: 'pikachu',
      pictureUrl: 'PICTURE_URL'
    };
    const action = LoadPokemonAction();

    const state = pokemonReducer({...initialState, pokemon}, action);

    expect(state).toEqual({
      ...initialState
    });
  });

  it('LoadPokemonSuccessAction should update pokemon', () => {
    const pokemon = {
      name: 'pikachu',
      pictureUrl: 'PICTURE_URL'
    };
    const action = LoadPokemonSuccessAction({pokemon});

    const state = pokemonReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      pokemon
    });
  });

  it('CorrectAnswerAction should increment numberOfCorrectAnswers and numberOfQuestionsAsked', () => {
    const action = CorrectAnswerAction();

    const state = pokemonReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      numberOfCorrectAnswers: 1,
      numberOfQuestionsAsked: 1
    });
  })

  it('IncorrectAnswerAction should increment numberOfQuestionsAsked', () => {
    const action = IncorrectAnswerAction();

    const state = pokemonReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      numberOfQuestionsAsked: 1,
    });
  });
});
