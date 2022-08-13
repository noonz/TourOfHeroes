import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { HEROES } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
    private heroesUrl = 'api/heroes';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private messageService: MessageService,
        private http: HttpClient
    ) { }

    //Local method
    // getHeroes(): Observable<Hero[]> {
    //     const heroes = of(HEROES);
    //     this.messageService.add('Hero Service: Fetching heroes');
    //     return heroes;
    // }

    //HttpMethod
    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap( _ => this.log('fetched heroes')),
                catchError(this.handleError<Hero[]>('getHeroes', []))
            )
    }

    //Local method
    // getHero(id: number): Observable<Hero> {
    //     const hero = HEROES.find( hero => hero.id === id)!;
    //     this.messageService.add(`HeroService: fetched hero id=${id}`);
    //     return of(hero);
    // }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url)
            .pipe(
                tap( _ => this.log(`fetch hero: ${id}`)),
                catchError(this.handleError<Hero>(`getHero:${id}`))
            );
    }

    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, this.httpOptions)
            .pipe(
                tap(_ => this.log(`update hero:${hero.id}`)),
                catchError(this.handleError<any>('updateHero'))
            );
    }

    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
            .pipe(
                tap(
                    (newHero: Hero) => this.log(`New hero:${newHero.id}`)
                ),
                catchError(this.handleError<Hero>('addHero'))
            );
    }

    deleteHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete<Hero>(url, this.httpOptions)
            .pipe(
                tap(_ => this.log(`deleted hero:${id}`)),
                catchError(this.handleError<Hero>('deleteHero'))
            );
    }

    searchHeroes(search: string): Observable<Hero[]> {
        if (!search.trim()) {
            return of([]);
        }

        return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${search}`)
            .pipe(
                tap( x => x.length
                    ? this.log(`found heroes matching "${search}"`)
                    : this.log(`no heroes matching "${search}"`)
                ),
                catchError(this.handleError<Hero[]>('searchHeroes', []))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            //TODO: send the error to remote logging infrastructure
            console.error(error);

            //TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            //Let the app keep running by returning an empty result
            return of(result as T);
        }
    }

    private log(msg: string) {
        this.messageService.add(`HeroService: ${msg}`);
    }
}
