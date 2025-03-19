import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutes} from './auth.routes';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {RouterModule} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PasswordResetComponent} from "./components/password-reset/password-reset.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const materialModules = [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule
]

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        PasswordResetComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...materialModules,
        RouterModule,
        AuthRoutes,
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        PasswordResetComponent
    ]
})
export class AuthModule {
}