import { TestBed, waitForAsync } from '@angular/core/testing';

import { PokemonResultApi, PokemonService } from './pokemon.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpRequest } from "@angular/common/http";
import { environment } from "../../environments/environment";

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PokemonService
      ]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should get total number of pokemons', waitForAsync(() => {
    const pokemonResultApi = {
      results: [
        'Bulbizare', 'Herbizarre', 'Florizarre'
      ]
    }

    service.getTotalNumberOfPokemons().subscribe(args => {
      expect(args).toEqual(3);
    });

    const req = httpMock.expectOne((request: HttpRequest<PokemonResultApi>) =>
      request.urlWithParams === `${environment.apiUrl}/pokemon/?limit=3000`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(pokemonResultApi);
  }));
});
