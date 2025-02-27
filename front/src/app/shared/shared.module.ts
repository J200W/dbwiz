import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {RouterModule} from '@angular/router';
// import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MaterialModule} from "../core/material.module";
// import {MaterialModule} from "./material.module";
// import {CookieService} from "ngx-cookie-service";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        provideHttpClient(),
        // {
        //     provide: HTTP_INTERCEPTORS, useClass:
        //     JwtInterceptor, multi: true
        // },
        // CookieService
    ],
    exports: [
        MaterialModule,
        HeaderComponent,
        FooterComponent
    ]
})
/**
 * Module partagé - SharedModule
 * @class
 */
export class SharedModule {
}