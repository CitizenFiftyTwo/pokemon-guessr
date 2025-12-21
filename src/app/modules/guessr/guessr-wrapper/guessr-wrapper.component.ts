import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { CorrectAnswerAction, IncorrectAnswerAction, LoadPokemonAction } from "../../../stores/pokemon/pokemon.action";
import { selectNumberOfCorrectAnswers, selectNumberOfQuestionsAsked, selectPokemon } from "../../../stores/pokemon";
import { Pokemon } from "../../../typings";

@Component({
  selector: 'app-guessr-wrapper',
  templateUrl: './guessr-wrapper.component.html',
  styleUrls: ['./guessr-wrapper.component.scss']
})
export class GuessrWrapperComponent implements OnInit {

  pokemon$: Observable<Pokemon | undefined> = of(undefined)
  numberOfCorrectAnswers$: Observable<number> = of(0)
  numberOfQuestionsAsked$: Observable<number> = of(0)
  displayPokemonName = false;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.pokemon$ = this.store.select(selectPokemon);
    this.numberOfQuestionsAsked$ = this.store.select(selectNumberOfQuestionsAsked);
    this.numberOfCorrectAnswers$ = this.store.select(selectNumberOfCorrectAnswers);
    this.store.dispatch(LoadPokemonAction());
  }

  handleCorrectAnswer() {
    this.displayPokemonName = true;
    this.store.dispatch(CorrectAnswerAction())
  }

  handleIncorrectAnswer() {
    this.displayPokemonName = true;
    this.store.dispatch(IncorrectAnswerAction())
  }

  getNextPokemon() {
    this.displayPokemonName = false;
    this.store.dispatch(LoadPokemonAction())
  }
}
