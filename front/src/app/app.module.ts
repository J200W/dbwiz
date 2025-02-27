import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NotFoundComponent} from "./modules/not-found/not-found.component";
import {AuthModule} from "./modules/authentification/auth.module";

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        ReactiveFormsModule,
        AppComponent,
        NotFoundComponent,
        AuthModule,
    ],
})
/**
 * Module principal
 * @class
 */
export class AppModule {}