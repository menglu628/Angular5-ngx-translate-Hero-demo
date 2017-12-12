import { Injectable } from '@angular/core';
import { HEROES } from "../mock-heroes";
import { Hero } from "../hero";

@Injectable()
export class HeroService {
    getHeroes(): Promise<Hero[]> {
        return Promise.resolve(HEROES);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
        });
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }
}

export class StringUtils {
    static format(str: string, ...values: (string | number)[]): string {
        return str.replace(/{(\d+)}/g, function(match, number) {
            return typeof values[number] !== 'undefined' ? values[number].toString() : match;
        });
    }
}