import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GenerateDatabaseComponent} from "./components/generate-database/generate-database.component";
import {BuildDatabaseComponent} from "./components/build-database/build-database.component";
import {LoaderDatabaseComponent} from "./components/loader-database/loader-database.component";

const routes: Routes = [
    {path: 'build', component: BuildDatabaseComponent,
        title: 'Construisez votre base de données | DB Wiz 🪄'},
    {path: 'generate/:id', component: GenerateDatabaseComponent,
        title: 'Nom du projet | DB Wiz 🪄'},
    {path: 'create/ai', component: LoaderDatabaseComponent,
        title: 'Création de votre projet... | DB Wiz 🪄'},
    {path: 'create/blank', component: LoaderDatabaseComponent,
        title: 'Création de votre projet... | DB Wiz 🪄'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatabaseRoutes {
}