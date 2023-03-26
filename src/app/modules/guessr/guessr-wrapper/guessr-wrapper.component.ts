import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { CorrectAnswerAction, IncorrectAnswerAction, LoadPokemonAction } from "../../../stores/pokemon/pokemon.action";
import { selectNumberOfCorrectAnswers, selectNumberOfQuestionsAsked, selectPokemon } from "../../../stores/pokemon";

@Component({
  selector: 'app-guessr-wrapper',
  templateUrl: './guessr-wrapper.component.html',
  styleUrls: ['./guessr-wrapper.component.scss']
})
export class GuessrWrapperComponent implements OnInit {

  pokemon$: Observable<Pokemon | undefined> = of(undefined)
  numberOfCorrectAnswers$: Observable<number> = of(0)
  numberOfQuestionsAked$: Observable<number> = of(0)

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.pokemon$ = this.store.select(selectPokemon);
    this.numberOfQuestionsAked$ = this.store.select(selectNumberOfQuestionsAsked);
    this.numberOfCorrectAnswers$ = this.store.select(selectNumberOfCorrectAnswers);
    this.store.dispatch(LoadPokemonAction());
  }

  handleCorrectAnswer() {
    this.store.dispatch(CorrectAnswerAction())
  }

  handleIncorrectAnswer() {
    this.store.dispatch(IncorrectAnswerAction())
  }

  getNextPokemon() {
    this.store.dispatch(LoadPokemonAction())
  }
}
