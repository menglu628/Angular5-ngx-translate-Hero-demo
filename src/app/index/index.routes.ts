import { IndexComponent } from "./components/index.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HeroDetailComponent } from "./components/hero_detail/hero_detail.component";
import { HeroesComponent } from "./components/heroes/heroes.component";

export const routes = [
    {
        path: '', component: IndexComponent, children: [
        { path: 'dashboard', component: DashboardComponent },
        {
            path: 'detail/:id',
            component: HeroDetailComponent
        },
        { path: 'heroes', component: HeroesComponent },
        { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
    }
];