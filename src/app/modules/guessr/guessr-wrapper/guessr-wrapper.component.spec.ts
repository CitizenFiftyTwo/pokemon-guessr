import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessrWrapperComponent } from './guessr-wrapper.component';
import { TranslateModule } from "@ngx-translate/core";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { selectNumberOfPokemons, selectPokemon } from "../../../stores/pokemon";
import { LoadPokemonAction } from "../../../stores/pokemon/pokemon.action";
import { RandomNumberService } from "../../../services/random-number.service";
import { GuessrModule } from "../guessr.module";

describe('GuessrWrapperComponent', () => {
  let component: GuessrWrapperComponent;
  let fixture: ComponentFixture<GuessrWrapperComponent>;
  let mockStore: MockStore;
  let randomNumberServiceSpy: jasmine.SpyObj<RandomNumberService>;


  beforeEach(async () => {
    randomNumberServiceSpy = jasmine.createSpyObj('RandomNumberService', ['getRandomNumber']);

    await TestBed.configureTestingModule({
      declarations: [GuessrWrapperComponent],
      imports: [
        GuessrModule,
        TranslateModule.forRoot()
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectNumberOfPokemons,
              value: 151
            },
            {
              selector: selectPokemon,
              value: {
                name: 'pikachu',
                pictureUrl: 'PICTURE_URL'
              }
            },
          ]
        }),
        {
          provide: RandomNumberService,
          useValue: randomNumberServiceSpy
        }
      ]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(GuessrWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockStore?.resetSelectors();
  });

  describe('OnInit', () => {
    it('should dispatch LoadPokemonAction  with a random id between 1 and pokemonNumber', () => {
      randomNumberServiceSpy.getRandomNumber.withArgs(151).and.returnValue(100);
      let dispatchSpyOn = spyOn(mockStore, 'dispatch');

      component.ngOnInit();

      expect(dispatchSpyOn).toHaveBeenCalledWith(LoadPokemonAction({pokemonId: 100}));
    });

    it('should select pokemon', () => {
      component.ngOnInit();

      component.pokemon$.subscribe(pokemon => {
        expect(pokemon).toEqual({
          name: 'pikachu',
          pictureUrl: 'PICTURE_URL'
        });
      });
    });
  })
});
