import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {PasswordResetComponent} from "./components/password-reset/password-reset.component";

const routes: Routes = [
    {title: 'Se connecter | DB Wiz', path: 'login', component: LoginComponent},
    {title: 'S\'inscrire | DB Wiz', path: 'register', component: RegisterComponent},
    {title: 'Mot de passe oublié | DB Wiz', path: 'password-reset', component: PasswordResetComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutes {
}