import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from "@angular/router";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IndexComponent } from "./index/components/index.component";
@Injectable()
export class TranslateResolver implements Resolve<any> {
    constructor(public translate: TranslateService,) {
        this.translate.addLangs(['ZH-CN', 'EN']);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let lang: string = localStorage.getItem("language");
        if (lang) {
            if (lang !== this.translate.currentLang) {
                return this.translate.use(lang);
            } else {

            }
        } else {
            return this.translate.use("ZH-CN");
        }
    }
}

export const ROUTES: Routes = [
    {
        path: '', component: IndexComponent, resolve: { translate: TranslateResolver },loadChildren: './index/index.module#IndexModule'
        // path: '', component: IndexComponent, resolve: { translate: TranslateResolver }, children: [
        // { path: 'index', loadChildren: './index/index.module#IndexModule' }
        // { path: 'dashboard', loadChildren: './overview/overview.module#OverviewModule' },  // must be included
    // ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
// make sure you match the component type string to the require in asyncRoutes
// async components with children routes must use WebpackAsyncRoute
//{path: '**', component: NoContentComponent},
];
