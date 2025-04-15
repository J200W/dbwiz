import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {RouterModule} from '@angular/router';
// import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MaterialModule} from "../core/material.module";
import {CodeEditorComponent} from "./components/code-editor/code-editor.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ChatWithAiComponent} from "./components/chat-with-ai/chat-with-ai.component";
// import {MaterialModule} from "./material.module";
// import {CookieService} from "ngx-cookie-service";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        HeaderComponent,
        FooterComponent,
        ChatWithAiComponent
    ],
    providers: [
        provideHttpClient(),
    ],
    exports: [
        MaterialModule,
        ReactiveFormsModule,
        HeaderComponent,
        FooterComponent,
        ChatWithAiComponent
    ]
})
/**
 * Module partagé - SharedModule
 * @class
 */
export class SharedModule {
}