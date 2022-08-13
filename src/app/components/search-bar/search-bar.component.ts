import { Component, OnInit } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
    heroes$!: Observable<Hero[]>;
    private searchString = new Subject<string>;

    constructor(
        private heroService: HeroService
    ) { }

    search(term: string): void {
        this.searchString.next(term);
    }

    ngOnInit(): void {
        this.heroes$ = this.searchString.pipe (
            //Wait 300ms after each keystroke before considering the term
            debounceTime(300),
            //Ignore new term if same as previous
            distinctUntilChanged(),
            //swtich to new search obersvable each time the term changes
            switchMap((term: string) => this.heroService.searchHeroes(term)),
        )
    }


}
