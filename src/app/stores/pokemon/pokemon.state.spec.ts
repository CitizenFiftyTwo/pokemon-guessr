import { AppState } from "../../app.ngrx";
import { PokemonState, selectNumberOfPokemons, selectPokemon } from "./pokemon.state";

describe('PokemonState', () => {
  let appState: AppState;
  let initialState: PokemonState;

  beforeEach(() => {
    initialState = {
      numberOfPokemons: 151,
      pokemonName: 'tortank',
      pokemonPictureUrl: 'PICTURE_URL',
      pokemon: {
        name: 'tortank',
        pictureUrl: 'PICTURE_URL',
      }
    };

    appState = {
      pokemon: initialState
    };
  });

  it('should select number of pokemons', () => {
    const numberOfPokemons = selectNumberOfPokemons(appState);

    expect(numberOfPokemons).toEqual(151);
  });

  it('should select pokemon', () => {
    const pokemon = selectPokemon(appState);

    expect(pokemon).toEqual({
      name: 'tortank',
      pictureUrl: 'PICTURE_URL',
    });
  });
});
