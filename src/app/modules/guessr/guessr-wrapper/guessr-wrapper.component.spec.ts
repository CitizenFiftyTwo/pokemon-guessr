import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessrWrapperComponent } from './guessr-wrapper.component';
import { TranslateModule } from "@ngx-translate/core";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { selectNumberOfPokemons, selectPokemonName } from "../../../stores/pokemon";
import { LoadPokemonNameAction } from "../../../stores/pokemon/pokemon.action";
import { RandomNumberService } from "../../../services/random-number.service";

describe('GuessrWrapperComponent', () => {
  let component: GuessrWrapperComponent;
  let fixture: ComponentFixture<GuessrWrapperComponent>;
  let mockStore: MockStore;
  let randomNumberServiceSpy: jasmine.SpyObj<RandomNumberService>;


  beforeEach(async () => {
    randomNumberServiceSpy = jasmine.createSpyObj('RandomNumberService', ['getRandomNumber']);

    await TestBed.configureTestingModule({
      declarations: [GuessrWrapperComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectNumberOfPokemons,
              value: 151
            },
            {
              selector: selectPokemonName,
              value: 'pikachu'
            }
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
    it('should dispatch LoadPokemonNameAction with a random id between 1 and pokemonNumber', () => {
      randomNumberServiceSpy.getRandomNumber.withArgs(151).and.returnValue(100);
      let dispatchSpyOn = spyOn(mockStore, 'dispatch');

      component.ngOnInit();

      expect(dispatchSpyOn).toHaveBeenCalledWith(LoadPokemonNameAction({pokemonId: 100}));
    });

    it('should select pokemon name', () => {
      component.ngOnInit();

      component.pokemonName$.subscribe(name => {
        expect(name).toEqual('pikachu');
      });
    });
  })
});
