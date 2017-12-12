/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from "@angular/core";
import { environment } from 'environments/environment';
import { AppState } from "./app.service";
import { TranslateService } from "@ngx-translate/core";

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.css'
    ],
    template: `
        <main style="height: 100%;">
            <router-outlet></router-outlet>
        </main>


    `
})
export class AppComponent {
    name = 'angular5 demo';
    url = 'http://www.chinapex.com.cn';
    showDevModule: boolean = environment.showDevModule;
    constructor(public appState: AppState,
                public translate: TranslateService) {
    }

    ngOnInit() {
        setTimeout(()=> {
            let lang: string = localStorage.getItem("language");
            if (lang) {
                if (lang !== this.translate.currentLang) {
                    return this.translate.use(lang);
                }
            } else {
                return this.translate.use("ZH-CN");
            }
        }, 3000)
    }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
