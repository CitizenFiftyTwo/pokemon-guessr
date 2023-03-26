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

  describe('submit', () => {
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

    it('should emit answerIsIncorrect when answer is incorrect', () => {
      let emitAnswerIsIncorrectSpy = spyOn(component.answerIsIncorrect, 'emit');
      component.pokemonName = 'pikachu'
      component.pokemonInputName = 'mewtwo'

      component.submit()

      expect(emitAnswerIsIncorrectSpy).toHaveBeenCalled()
    });
  });

});
