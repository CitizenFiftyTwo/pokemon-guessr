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

  getPokemonName(pokemonId: number): Observable<string> {
    return this.http.get<PokemonSpeciesApiSingleResult>(`${environment.apiUrl}/pokemon-species/${pokemonId}`)
      .pipe(map((result: PokemonSpeciesApiSingleResult) => {
        const pokemonName = result.names.find(name => name.language.name === this.LANGUAGE_FR)
        if (!pokemonName) {
          throw new Error(`Pokemon has no name for language ${this.LANGUAGE_FR}`)
        } else {
          return pokemonName.name
        }
      }));
  }
}

interface PokemonSpeciesApiMultipleResult {
  results: any[]
}

interface PokemonSpeciesApiSingleResult {
  names: PokemonName[]
}

interface PokemonName {
  language: Language
  name: string
}

interface Language {
  name: string
}
