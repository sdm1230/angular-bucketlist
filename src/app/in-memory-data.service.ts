import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bucketlist } from './bucketlist';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const bucketlists = [
      { age: 11, wish: 'Dr Nice' },
      { age: 12, wish: 'Narco' },
      { age: 13, wish: 'Bombasto' },
      { age: 14, wish: 'Celeritas' },
      { age: 15, wish: 'Magneta' },
      { age: 16, wish: 'RubberMan' },
      { age: 17, wish: 'Dynama' },
      { age: 18, wish: 'Dr IQ' },
      { age: 19, wish: 'Magma' },
      { age: 20, wish: 'Tornado' }
    ];
    return {bucketlists};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(bucketlists: Bucketlist[]): number {
    return bucketlists.length > 0 ? Math.max(...bucketlists.map(bucketlist => bucketlist.age)) + 1 : 11;
  }
}
