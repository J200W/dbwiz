import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatabaseRoutes} from './database.routes';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {GenerateDatabaseComponent} from "./components/generate-database/generate-database.component";
import {BuildDatabaseComponent} from "./components/build-database/build-database.component";
import {CodeEditorComponent} from "../../shared/components/code-editor/code-editor.component";
import {TableViewComponent} from "../../shared/components/table-view/table-view.component";
import {ChatWithAiComponent} from "../../shared/components/chat-with-ai/chat-with-ai.component";

const materialModules = [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule
]

@NgModule({
    declarations: [
        BuildDatabaseComponent,
        GenerateDatabaseComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...materialModules,
        RouterModule,
        DatabaseRoutes,
        CodeEditorComponent,
        TableViewComponent,
        ChatWithAiComponent
    ],
    exports: [
        BuildDatabaseComponent,
        GenerateDatabaseComponent
    ],
    providers: [],
})
export class DatabaseModule {
}