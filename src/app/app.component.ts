import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { LoadNumberOfPokemonsAction } from "./stores/pokemon/pokemon.action";
import { AppState } from "./app.ngrx";
import { selectNumberOfPokemons } from "./stores/pokemon";
import { of } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  numberOfPokemons$ = of(0)

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(LoadNumberOfPokemonsAction())
    this.numberOfPokemons$ = this.store.select(selectNumberOfPokemons)
  }

}
