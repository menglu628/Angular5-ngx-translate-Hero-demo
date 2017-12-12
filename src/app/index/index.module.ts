import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { IndexComponent } from "./components/index.component";
import { HeroDetailComponent } from "./components/hero_detail/hero_detail.component";
import { routes } from "./index.routes";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HeroesComponent } from "./components/heroes/heroes.component";
import { HeroService } from "./service/hero.service";

@NgModule({
    imports: [RouterModule, CommonModule, TranslateModule, FormsModule,  RouterModule.forChild(routes)],
    declarations: [IndexComponent, HeroDetailComponent, DashboardComponent, HeroesComponent],
    exports: [IndexComponent],
    providers: [ HeroService ]
})
export class IndexModule {
}