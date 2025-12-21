import { PokemonService } from "../../services/http/pokemon.service";
import { TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { PokemonEffects } from "./pokemon.effects";
import {
  LoadNumberOfPokemonsAction,
  LoadNumberOfPokemonsFailureAction,
  LoadNumberOfPokemonsSuccessAction,
  LoadPokemonAction,
  LoadPokemonSuccessAction
} from "./pokemon.action";
import { cold, hot } from "jasmine-marbles";
import { RandomNumberService } from "../../services/random-number.service";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { selectNumberOfPokemons } from "./pokemon.state";
import { selectLanguage } from "../settings";

describe('PokemonEffects', () => {
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;
  let randomNumberServiceSpy: jasmine.SpyObj<RandomNumberService>;
  let actions$: Observable<any>;
  let effects: PokemonEffects;
  let mockStore: MockStore;

  beforeEach(() => {
    pokemonServiceSpy = jasmine.createSpyObj('PokemonService',
      ['getNumberOfPokemons', 'getPokemonName', 'getPokemonPictureUrl']);
    randomNumberServiceSpy = jasmine.createSpyObj('RandomNumberService', ['getRandomNumber']);

    TestBed.configureTestingModule({
      providers: [
        PokemonEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: selectNumberOfPokemons,
              value: 151
            },
            {
              selector: selectLanguage,
              value: 'fr'
            }
          ]
        }),
        {
          provide: PokemonService,
          useValue: pokemonServiceSpy
        },
        {
          provide: RandomNumberService,
          useValue: randomNumberServiceSpy
        }
      ]
    });

    effects = TestBed.inject(PokemonEffects);
  });

  afterEach(() => {
    mockStore?.resetSelectors();
  });

  describe('Load number of pokemons', () => {
    const action = LoadNumberOfPokemonsAction();

    it('should dispatch success with number of pokemons', () => {
      pokemonServiceSpy.getNumberOfPokemons.and.returnValue(cold('-b', {b: 151}));
      const expectedAction = LoadNumberOfPokemonsSuccessAction({numberOfPokemons: 151});

      actions$ = hot('a', {a: action});

      expect(effects.loadNumberOfPokemons$).toBeObservable(cold('-c', {c: expectedAction}));
      expect(pokemonServiceSpy.getNumberOfPokemons).toHaveBeenCalled();
    });

    it('should dispatch failure when failure', () => {
      pokemonServiceSpy.getNumberOfPokemons.and.returnValue(cold('-#', undefined, {error: '500 Internal error server'}));
      const expectedAction = LoadNumberOfPokemonsFailureAction();

      actions$ = hot('a', {a: action});

      expect(effects.loadNumberOfPokemons$).toBeObservable(cold('-c', {c: expectedAction}));
    });
  });

  describe('Load pokemon', () => {
    const action = LoadPokemonAction();

    it('should get pokemon with a random id between 1 and pokemonNumber and dispatch success', () => {
      pokemonServiceSpy.getPokemonName.withArgs(1, 'fr').and.returnValue(
        of('bulbizarre'));
      pokemonServiceSpy.getPokemonPictureUrl.withArgs(1).and.returnValue(of('PICTURE_URL'));
      randomNumberServiceSpy.getRandomNumber.withArgs(151).and.returnValue(1);

      const expectedAction = LoadPokemonSuccessAction({
        pokemon: {
          name: 'bulbizarre',
          pictureUrl: 'PICTURE_URL'
        }
      });

      actions$ = hot('a', {a: action});

      expect(effects.loadPokemon$).toBeObservable(cold('b', {b: expectedAction}));
      expect(pokemonServiceSpy.getPokemonName).toHaveBeenCalledWith(1, 'fr');
      expect(pokemonServiceSpy.getPokemonPictureUrl).toHaveBeenCalledWith(1);
    });
  });

});
