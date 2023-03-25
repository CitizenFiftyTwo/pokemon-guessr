import { TestBed, waitForAsync } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
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


  it('getNumberOfPokemons should get number of pokemons', waitForAsync(() => {
    const apiResult = {
      results: [
        'Bulbizare', 'Herbizarre', 'Florizarre'
      ]
    }

    service.getNumberOfPokemons().subscribe(result => {
      expect(result).toEqual(3);
    });

    const req = httpMock.expectOne((request: HttpRequest<any>) =>
      request.urlWithParams === `${environment.apiUrl}/pokemon-species/?limit=3000`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(apiResult);
  }));

  describe('getPokemonName', () => {
    it('should get pokemon name in french', waitForAsync(() => {
      const apiResult = {
        names: [
          {
            language: 'en',
            name: 'bulbasaur'
          },
          {
            language: 'fr',
            name: 'bulbizarre'
          }
        ]
      }

      service.getPokemonName(0).subscribe(result => {
        expect(result).toEqual('bulbizarre');
      });

      const req = httpMock.expectOne((request: HttpRequest<any>) =>
        request.urlWithParams === `${environment.apiUrl}/pokemon-species/1`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(apiResult);
    }));

    it('should throw an error when pokemon has no french name', waitForAsync(() => {
      const apiResult = {
        names: [
          {
            language: 'en',
            name: 'bulbasaur'
          }
        ]
      }

      service.getPokemonName(0).subscribe({
        next: () => {
          fail('Expected an error to be thrown');
        },
        error: (err) => {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toEqual(`Pokemon has no name for language fr`);
        },
      });

      const req = httpMock.expectOne((request: HttpRequest<any>) =>
        request.urlWithParams === `${environment.apiUrl}/pokemon-species/1`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(apiResult);
    }));
  })
});
