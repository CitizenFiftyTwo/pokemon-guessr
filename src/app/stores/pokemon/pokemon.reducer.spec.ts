import { PokemonInitialState, PokemonState } from "./pokemon.state";
import { pokemonReducer } from "./pokemon.reducer";
import { INIT } from "@ngrx/store";
import {
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
  LoadPokemonNameSuccessAction
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

  it('LoadPokemonNameSuccessAction should update pokemon name', () => {
    const action = LoadPokemonNameSuccessAction({pokemonName: 'dracaufeu'});

    const state = pokemonReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      pokemonName: 'dracaufeu'
    });
  });
});
