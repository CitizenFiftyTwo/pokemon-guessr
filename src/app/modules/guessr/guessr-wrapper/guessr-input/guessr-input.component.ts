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

  @Output()
  nextPokemonRequested = new EventEmitter<void>();

  pokemonInputName: string = ''
  isAnswerSubmitted = false

  ngOnChanges(): void {
    this.isAnswerSubmitted = false;
    this.pokemonInputName = '';
  }

  submit() {
    this.isAnswerSubmitted = true;
    this.isCorrectAnswer() ? this.answerIsCorrect.emit() : this.answerIsIncorrect.emit()
  }

  getNextPokemon() {
    this.nextPokemonRequested.emit()
  }

  private isCorrectAnswer(): boolean {
    return this.normalize(this.pokemonName) === this.normalize(this.pokemonInputName)
  }

  private normalize(name: string) {
    return name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  }
}
