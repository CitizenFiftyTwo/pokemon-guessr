import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessrInputComponent } from './guessr-input.component';
import { TranslateModule } from "@ngx-translate/core";
import { GuessrModule } from "../../guessr.module";

describe('GuessrInputComponent', () => {
  let component: GuessrInputComponent;
  let fixture: ComponentFixture<GuessrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GuessrModule,
        TranslateModule.forRoot()
      ],
      declarations: [GuessrInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GuessrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('onChanges', () => {
    it('should set isAnswerSubmitted to false ', () => {
      component.isAnswerSubmitted = true

      component.ngOnChanges()

      expect(component.isAnswerSubmitted).toBeFalse()
    });

    it('should reset pokemonInputName ', () => {
      component.pokemonInputName = 'pikachu'

      component.ngOnChanges()

      expect(component.pokemonInputName).toEqual('')
    });
  })


  describe('submit', () => {
    it('should set isAnswerSubmitted to true', () => {
      component.submit()

      expect(component.isAnswerSubmitted).toBeTrue()
    });

    it('should emit answerIsCorrect when answer is correct', () => {
      let emitAnswerIsCorrectSpy = spyOn(component.answerIsCorrect, 'emit');
      component.pokemonName = 'pikachu'
      component.pokemonInputName = 'pikachu'

      component.submit()

      expect(emitAnswerIsCorrectSpy).toHaveBeenCalled()
    });

    it('should emit answerIsCorrect when answer is correct with case insensitive', () => {
      let emitAnswerIsCorrectSpy = spyOn(component.answerIsCorrect, 'emit');
      component.pokemonName = 'pikachu'
      component.pokemonInputName = 'PiKaChU'

      component.submit()

      expect(emitAnswerIsCorrectSpy).toHaveBeenCalled()
    });

    it('should emit answerIsCorrect when pokemon name has accent', () => {
      let emitAnswerIsCorrectSpy = spyOn(component.answerIsCorrect, 'emit');
      component.pokemonName = 'câblifère'
      component.pokemonInputName = 'cablifere'

      component.submit()

      expect(emitAnswerIsCorrectSpy).toHaveBeenCalled()
    });

    it('should emit answerIsCorrect when pokemon input name has accent', () => {
      let emitAnswerIsCorrectSpy = spyOn(component.answerIsCorrect, 'emit');
      component.pokemonName = 'cablifere'
      component.pokemonInputName = 'câblifère'

      component.submit()

      expect(emitAnswerIsCorrectSpy).toHaveBeenCalled()
    });

    it('should emit answerIsIncorrect when answer is incorrect', () => {
      let emitAnswerIsIncorrectSpy = spyOn(component.answerIsIncorrect, 'emit');
      component.pokemonName = 'pikachu'
      component.pokemonInputName = 'mewtwo'

      component.submit()

      expect(emitAnswerIsIncorrectSpy).toHaveBeenCalled()
    });
  });

  describe('getNextPokemon', () => {
    it('should emit nextPokemonRequested', () => {
      let emitAnswerIsCorrectSpy = spyOn(component.nextPokemonRequested, 'emit');

      component.getNextPokemon()

      expect(emitAnswerIsCorrectSpy).toHaveBeenCalled()
    })
  })
});
