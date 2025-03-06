import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from '@angular/router';
import {MaterialModule} from "./material.module";
import {SharedModule} from "../shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {CookieService} from "ngx-cookie-service";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        MaterialModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass:
            JwtInterceptor, multi: true
        },
        CookieService
    ],
    exports: [
        MaterialModule
    ]
})
/**
 * Module principal - CoreModule
 * @class
 */
export class CoreModule {
}