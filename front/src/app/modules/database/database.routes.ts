import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GenerateDatabaseComponent} from "./components/generate-database/generate-database.component";
import {BuildDatabaseComponent} from "./components/build-database/build-database.component";

const routes: Routes = [
    {path: 'build', component: BuildDatabaseComponent,
        title: 'Construisez votre base de données | DB Wiz 🪄'},
    {path: 'generate', component: GenerateDatabaseComponent,
        title: 'Générez votre base de données | DB Wiz 🪄'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatabaseRoutes {
}