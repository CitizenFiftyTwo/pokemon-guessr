import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-guessr-input',
  templateUrl: './guessr-input.component.html',
  styleUrls: ['./guessr-input.component.scss']
})
export class GuessrInputComponent implements OnChanges {

  @Input()
  pokemonName: string = ''

  @Output()
  answerIsCorrect = new EventEmitter<void>();

  @Output()
  answerIsIncorrect = new EventEmitter<void>();

  pokemonInputName: string = ''
  isAnswerSubmitted = false

  ngOnChanges(): void {
    this.isAnswerSubmitted = false;
  }

  submit() {
    this.isAnswerSubmitted = true;
    this.isCorrectAnswer() ? this.answerIsCorrect.emit() : this.answerIsIncorrect.emit()
  }

  private isCorrectAnswer(): boolean {
    return this.pokemonName.toLowerCase() === this.pokemonInputName.toLowerCase()
  }
}
