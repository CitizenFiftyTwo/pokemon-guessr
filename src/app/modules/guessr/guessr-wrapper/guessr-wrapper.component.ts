import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { filter, map, Observable, of, take } from "rxjs";
import { CorrectAnswerAction, IncorrectAnswerAction, LoadPokemonAction } from "../../../stores/pokemon/pokemon.action";
import {
  selectNumberOfCorrectAnswers,
  selectNumberOfPokemons,
  selectNumberOfQuestionsAsked,
  selectPokemon
} from "../../../stores/pokemon";
import { RandomNumberService } from "../../../services/random-number.service";

@Component({
  selector: 'app-guessr-wrapper',
  templateUrl: './guessr-wrapper.component.html',
  styleUrls: ['./guessr-wrapper.component.scss']
})
export class GuessrWrapperComponent implements OnInit {

  numberOfPokemons$: Observable<number> = of(0)
  pokemon$: Observable<Pokemon | undefined> = of(undefined)
  numberOfCorrectAnswers$: Observable<number> = of(0)
  numberOfQuestionsAked$: Observable<number> = of(0)

  constructor(private store: Store,
              private randomNumberService: RandomNumberService) {
  }

  ngOnInit(): void {
    this.pokemon$ = this.store.select(selectPokemon);
    this.numberOfPokemons$ = this.store.select(selectNumberOfPokemons);
    this.numberOfQuestionsAked$ = this.store.select(selectNumberOfQuestionsAsked);
    this.numberOfCorrectAnswers$ = this.store.select(selectNumberOfCorrectAnswers);
    this.numberOfPokemons$.pipe(
      filter(numberOfPokemon => numberOfPokemon > 0),
      take(1),
      map(numberOfPokemon =>
        LoadPokemonAction({pokemonId: this.randomNumberService.getRandomNumber(numberOfPokemon)})),
    ).subscribe(action => this.store.dispatch(action));
  }

  handleCorrectAnswer() {
    this.store.dispatch(CorrectAnswerAction())
  }

  handleIncorrectAnswer() {
    this.store.dispatch(IncorrectAnswerAction())
  }
}
