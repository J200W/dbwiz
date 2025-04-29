import {NgModule} from '@angular/core';
import {CommonModule, NgClass, NgIf} from '@angular/common';
import { provideHttpClient } from "@angular/common/http";
import {RouterModule} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MaterialModule} from "../core/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ChatWithAiComponent} from "./components/chat-with-ai/chat-with-ai.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

const materialModules = [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        HeaderComponent,
        FooterComponent,
        ChatWithAiComponent,
        NgIf,
        NgClass,
        MatDialogModule,
        ...materialModules
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