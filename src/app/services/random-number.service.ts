import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

  getRandomNumber(n: number): number {
    if (n < 0) {
      return NaN;
    }
    return Math.floor(Math.random() * n) + 1;
  }
}
