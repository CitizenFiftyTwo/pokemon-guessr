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
    it('should set isAnswerSubmitted to true', () => {
      component.submit()

      expect(component.isAnswerSubmitted).toBeTrue()
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
