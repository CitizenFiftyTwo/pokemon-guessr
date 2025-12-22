import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-guessr-input',
  templateUrl: './guessr-input.component.html',
  styleUrls: ['./guessr-input.component.scss']
})
export class GuessrInputComponent implements OnInit, OnChanges, AfterViewChecked {

  @ViewChild('pokemonInput') pokemonInput!: ElementRef<HTMLInputElement>;

  @Input()
  pokemonName: string = '';

  @Output()
  answerIsCorrect = new EventEmitter<void>();

  @Output()
  answerIsIncorrect = new EventEmitter<void>();

  @Output()
  nextPokemonRequested = new EventEmitter<void>();

  pokemonInputName: string = '';
  isAnswerSubmitted = false;
  autoFocusApplied = false;
  isCompactView = false;

  ngOnInit(): void {
    this.updateViewportMode();
  }

  ngOnChanges(): void {
    this.isAnswerSubmitted = false;
    this.pokemonInputName = '';
  }

  ngAfterViewChecked() {
    if (!this.isAnswerSubmitted && this.pokemonInput && !this.autoFocusApplied && !this.isCompactView) {
      this.autoFocusApplied = true;
      this.pokemonInput.nativeElement.focus();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateViewportMode();
  }

  private updateViewportMode() {
    this.isCompactView = window.innerWidth < 1250;
  }

  submit() {
    this.isAnswerSubmitted = true;
    this.autoFocusApplied = false;
    this.isCorrectAnswer() ? this.answerIsCorrect.emit() : this.answerIsIncorrect.emit();
  }

  getNextPokemon() {
    this.nextPokemonRequested.emit();
  }

  isCorrectAnswer(): boolean {
    return this.normalize(this.pokemonName) === this.normalize(this.pokemonInputName);
  }

  private normalize(name: string) {
    return name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  }
}
