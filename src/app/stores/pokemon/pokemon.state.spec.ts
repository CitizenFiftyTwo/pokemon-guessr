import { AppState } from "../../app.ngrx";
import {
  PokemonState,
  selectNumberOfPokemons,
  selectNumberOfQuestionsAsked,
  selectPokemon,
  selectScore
} from "./pokemon.state";

describe('PokemonState', () => {
  let appState: AppState;
  let initialState: PokemonState;

  beforeEach(() => {
    initialState = {
      numberOfPokemons: 151,
      pokemon: {
        name: 'tortank',
        pictureUrl: 'PICTURE_URL',
      },
      score: 10,
      numberOfQuestionsAsked: 20
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

  it('should select score', () => {
    const pokemon = selectScore(appState);

    expect(pokemon).toEqual(10);
  });

  it('should select number of questions asked', () => {
    const pokemon = selectNumberOfQuestionsAsked(appState);

    expect(pokemon).toEqual(20);
  });
});
