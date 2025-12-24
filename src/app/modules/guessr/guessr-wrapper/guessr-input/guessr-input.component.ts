import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-guessr-input',
  templateUrl: './guessr-input.component.html',
  styleUrls: ['./guessr-input.component.scss']
})
export class GuessrInputComponent implements OnChanges, AfterViewChecked {

  @ViewChild('pokemonInput') pokemonInput!: ElementRef<HTMLInputElement>;

  @Input()
  pokemonName: string = '';

  @Input()
  isCompactView = false;

  @Output()
  resultScoreSubmitted = new EventEmitter<number>();

  @Output()
  nextPokemonRequested = new EventEmitter<void>();

  pokemonInputName: string = '';
  isAnswerSubmitted = false;
  autoFocusApplied = false;
  answerResult: AnswerResult | undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonName']) {
      this.isAnswerSubmitted = false;
      this.pokemonInputName = '';
    }
  }

  ngAfterViewChecked() {
    if (!this.isAnswerSubmitted && this.pokemonInput && !this.autoFocusApplied && !this.isCompactView) {
      this.autoFocusApplied = true;
      this.pokemonInput.nativeElement.focus();
    }
  }

  submit() {
    this.getAnswerResult();
    this.isAnswerSubmitted = true;
    this.autoFocusApplied = false;
    let resultScore = 0;
    if (this.answerResult === 'correct') {
      resultScore += 1;
    } else if (this.answerResult === 'almost-correct') {
      resultScore += 0.5;
    }
    this.resultScoreSubmitted.emit(resultScore);
  }

  getNextPokemon() {
    this.nextPokemonRequested.emit();
  }

  getAnswerResult(): void {
    const target = this.normalize(this.pokemonName);
    const input = this.normalize(this.pokemonInputName);
    const distance = this.levenshtein(input, target);

    if (distance === 0) {
      this.answerResult = AnswerResult.correct;
    } else if (distance <= 2) {
      this.answerResult = AnswerResult.almostCorrect;
    } else {
      this.answerResult = AnswerResult.incorrect;
    }
  }

  private normalize(name: string) {
    return name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  }

  private levenshtein(a: string, b: string) {
    const matrix = Array.from({length: b.length + 1}, (_, i) =>
      Array(a.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        if (a[i - 1] === b[j - 1]) {
          matrix[j][i] = matrix[j - 1][i - 1];
        } else {
          matrix[j][i] = Math.min(
            matrix[j - 1][i] + 1,     // suppression
            matrix[j][i - 1] + 1,     // insertion
            matrix[j - 1][i - 1] + 1  // substitution
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  protected toLabelCode(answerResult: AnswerResult | undefined) {
    if (!answerResult) {
      return "";
    }
    return answerResult.replace("-", "_").toUpperCase();
  }
}

export enum AnswerResult {
  correct = 'correct',
  almostCorrect = 'almost-correct',
  incorrect = 'incorrect'
}
