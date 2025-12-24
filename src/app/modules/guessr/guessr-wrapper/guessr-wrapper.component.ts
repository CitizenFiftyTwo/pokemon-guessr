import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { LoadPokemonAction, SubmitScoreAction } from "../../../stores/pokemon/pokemon.action";
import { selectNumberOfQuestionsAsked, selectPokemon, selectScore } from "../../../stores/pokemon";
import { Pokemon } from "../../../typings";
import { selectIsShadowMode, selectNumberOfRounds } from "../../../stores/settings";

@Component({
  selector: 'app-guessr-wrapper',
  templateUrl: './guessr-wrapper.component.html',
  styleUrls: ['./guessr-wrapper.component.scss']
})
export class GuessrWrapperComponent implements OnInit {

  pokemon$: Observable<Pokemon | undefined> = of(undefined);
  score$: Observable<number> = of(0);
  numberOfQuestionsAsked$: Observable<number> = of(0);
  numberOfRounds$: Observable<number> = of(0);
  isShadowMode$: Observable<boolean> = of(false);
  displayPokemonName = false;
  displayResult = false;
  roundNumber = 1;
  isCompactView = false;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.pokemon$ = this.store.select(selectPokemon);
    this.numberOfQuestionsAsked$ = this.store.select(selectNumberOfQuestionsAsked);
    this.score$ = this.store.select(selectScore);
    this.numberOfRounds$ = this.store.select(selectNumberOfRounds);
    this.isShadowMode$ = this.store.select(selectIsShadowMode);
    this.store.dispatch(LoadPokemonAction());
    this.updateViewportMode();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateViewportMode();
  }

  private updateViewportMode() {
    this.isCompactView = window.innerWidth < 1250;
  }

  protected handleResultScore(score: number) {
    this.displayPokemonName = true;
    this.store.dispatch(SubmitScoreAction({score}));

  }

  getNextPokemon(numberOfRounds: number) {
    if (this.roundNumber === numberOfRounds) {
      this.displayResult = true;
    } else {
      this.roundNumber++;
      this.displayPokemonName = false;
      this.store.dispatch(LoadPokemonAction());
    }
  }
}
