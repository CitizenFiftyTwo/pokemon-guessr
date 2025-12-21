import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { LanguageService } from "../../services/language.service";
import { GlobalEffects } from "./global.effect";
import { SetSettingsAction } from "../settings/settings.action";
import { ROOT_EFFECTS_INIT } from "@ngrx/effects";

describe('GlobalEffects', () => {
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let actions$: Observable<any>;
  let effects: GlobalEffects;

  beforeEach(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', ['getLanguage']);

    TestBed.configureTestingModule({
      providers: [
        GlobalEffects,
        provideMockActions(() => actions$),
        {
          provide: LanguageService,
          useValue: languageServiceSpy
        }
      ]
    });

    effects = TestBed.inject(GlobalEffects);
  });

  describe('Init Language', () => {
    it('should dispatch success with number of pokemons', () => {
      languageServiceSpy.getLanguage.and.returnValue('fr');
      const expectedAction = SetSettingsAction({language: 'fr'});

      actions$ = hot('a', {a: {type: ROOT_EFFECTS_INIT}});

      expect(effects.initLanguage$).toBeObservable(cold('c', {c: expectedAction}));
      expect(languageServiceSpy.getLanguage).toHaveBeenCalled();
    });
  });
});
