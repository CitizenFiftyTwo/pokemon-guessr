import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { LoadNumberOfPokemonsAction } from "./stores/pokemon/pokemon.action";
import { selectNumberOfPokemons } from "./stores/pokemon";
import { selectLanguage } from "./stores/settings";
import { PokemonService } from "./services/pokemon.service";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    translateServiceSpy = jasmine.createSpyObj('PokemonService', ['use']);
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceSpy
        },
        provideMockStore({
          selectors: [
            {
              selector: selectNumberOfPokemons,
              value: 151
            },
            {
              selector: selectLanguage,
              value: 'en'
            }
          ]
        }),
      ]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  describe('OnInit should dispatch load number of pokemons ', () => {
    it('should dispatch load number of pokemons ', () => {
      let dispatchSpyOn = spyOn(mockStore, 'dispatch');

      component.ngOnInit();

      expect(dispatchSpyOn).toHaveBeenCalledWith(LoadNumberOfPokemonsAction());
    });

    it('should select number of pokemons ', () => {
      component.ngOnInit();

      component.numberOfPokemons$.subscribe(numberOfPokemons => {
        expect(numberOfPokemons).toEqual(151);
      });
    });

    it('should use selected language ', () => {
      component.ngOnInit();

      expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
    });
  });
});
