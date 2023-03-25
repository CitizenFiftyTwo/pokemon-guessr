import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly LIMIT_NUMBER_OF_POKEMONS = 3000;
  private readonly LANGUAGE_FR = 'fr';

  constructor(private http: HttpClient) {
  }

  getNumberOfPokemons(): Observable<number> {
    return this.http.get<PokemonSpeciesApiMultipleResult>(`${environment.apiUrl}/pokemon-species/?limit=${this.LIMIT_NUMBER_OF_POKEMONS}`)
      .pipe(map((result: PokemonSpeciesApiMultipleResult) => result.results.length));
  }

  getPokemonName(pokemonIndex: number): Observable<string | undefined> {
    return this.http.get<PokemonSpeciesApiSingleResult>(`${environment.apiUrl}/pokemon-species/${pokemonIndex + 1}`)
      .pipe(map((result: PokemonSpeciesApiSingleResult) => result.names.find(name => name.language === this.LANGUAGE_FR)?.name));
  }

}

interface PokemonSpeciesApiMultipleResult {
  results: any[]
}

interface PokemonSpeciesApiSingleResult {
  names: PokemonName[]
}

interface PokemonName {
  language: string
  name: string
}
