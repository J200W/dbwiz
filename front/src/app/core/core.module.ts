import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from "./material.module";
import {SharedModule} from "../shared/shared.module";
import {CookieService} from "ngx-cookie-service";
import {provideHttpClient} from "@angular/common/http";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        MaterialModule
    ],
    providers: [
        CookieService,
        provideHttpClient()
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