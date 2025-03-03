import { Routes } from '@angular/router';
import {LandingComponent} from "./modules/landing/landing.component";
import {UnauthGuard} from "./core/guards/unauth.guard";
import {NotFoundComponent} from "./modules/not-found/not-found.component";
import {PrivacyPolicyComponent} from "./modules/legal/privacy-policy/privacy-policy.component";
import {TermsOfUseComponent} from "./modules/legal/terms-of-use/terms-of-use.component";
import {BuildDatabaseComponent} from "./modules/database/components/build-database/build-database.component";
import {GenerateDatabaseComponent} from "./modules/database/components/generate-database/generate-database.component";

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        title: 'Accueil | DB Wiz 🪄'
    },
    {
        path: 'auth',
        // canActivate: [UnauthGuard],
        loadChildren: () => import('./modules/authentification/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'database',
        // canActivate: [UnauthGuard],
        loadChildren: () => import('./modules/database/database.module').then(m => m.DatabaseModule)
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        title: 'Politique de confidentialité | DB Wiz 🪄'
    },
    {
        path: 'terms-of-use',
        component: TermsOfUseComponent,
        title: 'Conditions d\'utilisation | DB Wiz 🪄'
    },
    {path: '404', component: NotFoundComponent, title: '404 | MondeDeDév'},
    {path: '**', redirectTo: '/404'}
];
