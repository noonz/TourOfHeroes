import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
    constructor() { }

    createDb() {
        const heroes = [
            { id: 12, name: 'Spiderman' },
            { id: 13, name: 'Superman' },
            { id: 14, name: 'Punisher' },
            { id: 15, name: 'Batman' },
            { id: 16, name: 'Cat Woman' },
            { id: 17, name: 'Wonder Woman' },
            { id: 18, name: 'Flash' },
            { id: 19, name: 'Jessica Jones' },
            { id: 20, name: 'Black Widow' }
          ];
          return {heroes};
    }

    genId(heroes: Hero[]): number {
        return heroes.length > 0
            ? Math.max(...heroes.map(hero => hero.id)) + 1
            : 11;
    }
}
