import { PokemonService } from "../../services/pokemon.service";
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

describe('PokemonEffects', () => {
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;
  let actions$: Observable<any>;
  let effects: PokemonEffects;

  beforeEach(() => {
    pokemonServiceSpy = jasmine.createSpyObj('PokemonService',
      ['getNumberOfPokemons', 'getPokemonName', 'getPokemonPictureUrl']);

    TestBed.configureTestingModule({
      providers: [
        PokemonEffects,
        provideMockActions(() => actions$),
        {
          provide: PokemonService,
          useValue: pokemonServiceSpy
        }
      ]
    });

    effects = TestBed.inject(PokemonEffects);
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
    const action = LoadPokemonAction({pokemonId: 1});

    it('should dispatch success with pokemon', () => {
      pokemonServiceSpy.getPokemonName.withArgs(1).and.returnValue(
        of('bulbizarre'));
      pokemonServiceSpy.getPokemonPictureUrl.withArgs(1).and.returnValue(of('PICTURE_URL'));
      const expectedAction = LoadPokemonSuccessAction({
        pokemon: {
          name: 'bulbizarre',
          pictureUrl: 'PICTURE_URL'
        }
      });

      actions$ = hot('a', {a: action});

      expect(effects.loadPokemon$).toBeObservable(cold('b', {b: expectedAction}));
      expect(pokemonServiceSpy.getPokemonName).toHaveBeenCalledWith(1);
      expect(pokemonServiceSpy.getPokemonPictureUrl).toHaveBeenCalledWith(1);
    });
  });

});
