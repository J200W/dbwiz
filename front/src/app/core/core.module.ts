import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from '@angular/router';
import {MaterialModule} from "./material.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        MaterialModule
    ],
    providers: [
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