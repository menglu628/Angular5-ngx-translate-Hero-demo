import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AppState } from "../../app.service";

@Component({
    selector: 'sd-app',
    styleUrls: ['./index.component.css'],
    templateUrl: './index.component.html'
})

export class IndexComponent {
    title: string;
    curLangText: string;

    constructor(
        private translate: TranslateService,
        private app: AppState
    ) {
    }

    ngOnInit() : void {
        this.title = this.translate.instant("HERO.TOUR_OF_HEROES");
        this.translate.onLangChange.subscribe(() => {
            this.title = this.translate.instant("HERO.TOUR_OF_HEROES");
        });
        if (this.app.getCurLang() === 'ZH-CN') {
            this.curLangText = 'English';
        } else {
            this.curLangText = '简体中文';
        }
    }

    toogleLang() {
        if (this.translate.currentLang === 'ZH-CN') {
            this.curLangText = '简体中文';
            this.switchToLang('EN');
        } else {
            this.curLangText = 'English';
            this.switchToLang('ZH-CN');
        }
    }

    switchToLang(lang: string) {
        this.app.setCurLang(lang);
        this.translate.use(this.app.getCurLang());
        localStorage.setItem("language", lang);
    }
}
