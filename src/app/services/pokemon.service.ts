import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly LIMIT_NUMBER_OF_POKEMONS = 3000;

  constructor(private http: HttpClient) {
  }

  getNumberOfPokemons(): Observable<number> {
    return this.http.get<PokemonResultApi>(`${environment.apiUrl}/pokemon/?limit=${this.LIMIT_NUMBER_OF_POKEMONS}`)
      .pipe(map((pokemonResultApi: PokemonResultApi) => pokemonResultApi.results.length));
  }
}

export interface PokemonResultApi {
  results: any[]
}
