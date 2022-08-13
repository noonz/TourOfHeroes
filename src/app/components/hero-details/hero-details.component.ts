import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
    selector: 'app-hero-details',
    templateUrl: './hero-details.component.html',
    styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
    @Input() public hero?: Hero;

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.getHeroDetails();
    }

    getHeroDetails(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.heroService.getHero(id).subscribe(
            hero => this.hero = hero
        )
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        if (this.hero) {
            this.heroService.updateHero(this.hero)
                .subscribe(
                    () => this.goBack()
                )
        }
    }
}
