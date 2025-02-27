import { Routes } from '@angular/router';
import {LandingComponent} from "./modules/landing/landing.component";
import {UnauthGuard} from "./core/guards/unauth.guard";
import {NotFoundComponent} from "./modules/not-found/not-found.component";

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        title: 'DB Wiz 🪄 | Accueil'
    },
    {
        path: 'auth',
        // canActivate: [UnauthGuard],
        loadChildren: () => import('./modules/authentification/auth.module').then(m => m.AuthModule)
    },
    {path: '404', component: NotFoundComponent, title: '404 | MondeDeDév'},
    {path: '**', redirectTo: '/404'}
];
