import { AppState } from "../../app.ngrx";
import { PokemonState, selectNumberOfPokemons } from "./pokemon.state";

describe('PokemonState', () => {
  let appState: AppState;
  let initialState: PokemonState;

  beforeEach(() => {
    initialState = {
      numberOfPokemons: 151
    };

    appState = {
      pokemon: initialState
    };
  });

  it('should select number of pokemons', () => {
    const numberOfPokemons = selectNumberOfPokemons(appState);

    expect(numberOfPokemons).toEqual(151);
  });
});
