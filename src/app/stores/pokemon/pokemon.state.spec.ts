import { AppState } from "../../app.ngrx";
import { PokemonState, selectNumberOfPokemons, selectPokemonName } from "./pokemon.state";

describe('PokemonState', () => {
  let appState: AppState;
  let initialState: PokemonState;

  beforeEach(() => {
    initialState = {
      numberOfPokemons: 151,
      pokemonName: 'tortank'
    };

    appState = {
      pokemon: initialState
    };
  });

  it('should select number of pokemons', () => {
    const numberOfPokemons = selectNumberOfPokemons(appState);

    expect(numberOfPokemons).toEqual(151);
  });

  it('should select pokemon name', () => {
    const pokemonName = selectPokemonName(appState);

    expect(pokemonName).toEqual('tortank');
  });
});
