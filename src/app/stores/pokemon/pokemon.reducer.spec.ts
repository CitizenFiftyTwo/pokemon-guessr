import { PokemonInitialState, PokemonState } from "./pokemon.state";
import { pokemonReducer } from "./pokemon.reducer";
import { INIT } from "@ngrx/store";
import {
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
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

});
