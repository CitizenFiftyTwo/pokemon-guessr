import { TestBed } from '@angular/core/testing';

import { RandomNumberService } from './random-number.service';

describe('RandomNumberService', () => {
  let service: RandomNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomNumberService);
  });

  it('should return a number between 1 and n', () => {
    const n = 10;

    const randomNumber = service.getRandomNumber(n);

    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThan(n);
  });

  it('should return 1 when n is 1', () => {
    const n = 1;

    const randomNumber = service.getRandomNumber(n);

    expect(randomNumber).toEqual(1);
  });

  it('should return NaN when n is negative', () => {
    const n = -10;

    const randomNumber = service.getRandomNumber(n);

    expect(randomNumber).toBeNaN();
  });
});
