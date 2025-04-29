import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import {ThreadService} from "../../services/thread.service";
import {BuildDatabase} from "../../interfaces/build-database.interface";
import {Subscription} from "rxjs";
import * as mermaid from "mermaid";
import {LoadingPageComponent} from "../../../../shared/components/loading-page/loading-page.component";

@Component({
    selector: 'app-loader-database',
    imports: [
        LoadingPageComponent
    ],
    templateUrl: './loader-database.component.html',
    styleUrl: './loader-database.component.scss'
})
export class LoaderDatabaseComponent implements OnInit {
    private generateWithAi: boolean | null = null;
    public loading: boolean = true;
    private buildRequest: BuildDatabase | undefined;
    public subscriptions: Subscription = new Subscription();

    constructor(
        private router: Router,
        private databaseService: DatabaseService,
        private threadService: ThreadService,
    ) {
        this.buildRequest = this.router.getCurrentNavigation()?.extras.state as BuildDatabase;
    }

    ngOnInit(): void {
        this.generateWithAi = this.router.url.includes('/ai');
        this.loadDatabase();
        mermaid.default.parseError = function (err: any) {
            console.error(err);
        }
    }

    public loadDatabase(): void {
        this.loading = true;
        this.subscriptions.add(this.threadService.buildProject().subscribe({
            next: (response: any) => {
                let threadId = response.threadId;
                if (this.generateWithAi) {
                    this.subscriptions.add(this.databaseService.generateDatabase(this.buildRequest!, threadId).subscribe({
                        next: (response: any) => {
                            this.loading = false;
                            this.router.navigate([`/database/generate/${threadId}`], {state: {data: response}});
                        },
                        error: (err: any) => {
                            this.loading = false;
                            console.error(err);
                        }
                    }))
                }
                else {
                    this.loading = false;
                    this.router.navigate([`/database/generate/${threadId}`], {state: {data: response}});
                }
            },
            error: (err: any) => {
                this.loading = false;
                console.error(err);
            }
        }))
    }
}
