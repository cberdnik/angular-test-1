import { Injectable } from '@angular/core';
import { map, Observable, range, mergeMap, of } from 'rxjs';

@Injectable()
export class FizzBuzzService {
  constructor() {}

  public createFizzBuzz(start: number, end: number): Observable<string> {
    return range(start, end).pipe(map((n: number) => this.fizzBuzz(n)));
  }

  private fizzBuzz(n: number): string {
    if (n % 3 === 0 && n % 5 === 0) {
      return 'fizzBuzz';
    } else if (n % 3 === 0) {
      return 'fizz';
    } else if (n % 5 === 0) {
      return 'buzz';
    }
  }
}
