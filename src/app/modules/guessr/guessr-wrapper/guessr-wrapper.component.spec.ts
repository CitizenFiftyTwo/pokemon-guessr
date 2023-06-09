import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessrWrapperComponent } from './guessr-wrapper.component';
import { TranslateModule } from "@ngx-translate/core";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import {
  selectNumberOfCorrectAnswers,
  selectNumberOfPokemons,
  selectNumberOfQuestionsAsked,
  selectPokemon
} from "../../../stores/pokemon";
import { CorrectAnswerAction, IncorrectAnswerAction, LoadPokemonAction } from "../../../stores/pokemon/pokemon.action";
import { GuessrModule } from "../guessr.module";

describe('GuessrWrapperComponent', () => {
  let component: GuessrWrapperComponent;
  let fixture: ComponentFixture<GuessrWrapperComponent>;
  let mockStore: MockStore;


  beforeEach(async () => {

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
            {
              selector: selectNumberOfCorrectAnswers,
              value: 10
            },
            {
              selector: selectNumberOfQuestionsAsked,
              value: 20
            }
          ]
        })
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
    it('should dispatch LoadPokemonAction', () => {
      let dispatchSpyOn = spyOn(mockStore, 'dispatch');

      component.ngOnInit();

      expect(dispatchSpyOn).toHaveBeenCalledWith(LoadPokemonAction());
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

    it('should select number of correct answers', () => {
      component.ngOnInit();

      component.numberOfCorrectAnswers$.subscribe(numberOfCorrectAnswers => {
        expect(numberOfCorrectAnswers).toEqual(10);
      });
    });

    it('should select number of quesstions asked', () => {
      component.ngOnInit();

      component.numberOfQuestionsAked$.subscribe(numberOfQuestionsAked => {
        expect(numberOfQuestionsAked).toEqual(20);
      });
    });
  })

  describe('handleCorrectAnswer', () => {
    it('should dispatch CorrectAnswerAction', () => {
      let dispatchSpyOn = spyOn(mockStore, 'dispatch');

      component.handleCorrectAnswer();

      expect(dispatchSpyOn).toHaveBeenCalledWith(CorrectAnswerAction());
    });
  })

  describe('handleIncorrectAnswer', () => {
    it('should dispatch CorrectAnswerAction', () => {
      let dispatchSpyOn = spyOn(mockStore, 'dispatch');

      component.handleIncorrectAnswer();

      expect(dispatchSpyOn).toHaveBeenCalledWith(IncorrectAnswerAction());
    });
  })

  describe('getNextPokemon', () => {
    it('should dispatch LoadPokemonAction', () => {
      let dispatchSpyOn = spyOn(mockStore, 'dispatch');

      component.getNextPokemon();

      expect(dispatchSpyOn).toHaveBeenCalledWith(LoadPokemonAction());
    });
  })
});
