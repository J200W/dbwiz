import {
    Component,
    OnDestroy,
    OnInit,
    AfterViewInit,
    ElementRef,
    ViewChild,
    ChangeDetectorRef,
    NgZone
} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import {BuildDatabase} from "../../interfaces/build-database.interface";
import * as mermaid from "mermaid";
import "mermaid/dist/mermaid.esm.mjs";
import convertSQLToTableView from "../../functions/convert-sql-to-table-view";
import {debounceTime, fromEvent, of, Subscription, switchMap, tap, timer} from "rxjs";
import {CodeEditorComponent} from "../../../../shared/components/code-editor/code-editor.component";
import {Entity} from "../../functions/entity-interface";
import convertSQLToMermaid from "../../functions/convert-sql-to-mermaid";

@Component({
    selector: 'app-generate-database',
    standalone: false,
    templateUrl: './generate-database.component.html',
    styleUrl: './generate-database.component.scss'
})
export class GenerateDatabaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('mermaidContainer', {static: false}) mermaidContainer!: ElementRef;
    @ViewChild('erDiagramDiv', {static: false}) erDiagramDiv!: ElementRef;
    @ViewChild(CodeEditorComponent) codeEditor!: CodeEditorComponent;

    private buildRequest: BuildDatabase | undefined;
    private schema: string | null = '';
    public initSchema: string | null = '';
    public tableView: Entity[] | null = []
    public mermaidContent: string = "";
    public mermaidIsLoading: boolean = false;
    public subscriptions: Subscription = new Subscription();

    public sqlFormatError: string | null = null;

    public activeTab: string = 'code';

    constructor(
        private router: Router,
        private databaseService: DatabaseService,
        private clipboard: Clipboard,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone
    ) {
        this.buildRequest = this.router.getCurrentNavigation()?.extras.state as BuildDatabase;
    }

    ngOnInit(): void {
        this.generateDatabase();
        mermaid.default.parseError = function (err: any) {
            console.error(err);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public generateDatabase(): void {
        this.subscriptions.add(this.databaseService.buildDatabase(this.buildRequest!).subscribe({
            next: (response: any) => {
                var formattedSQL = response.result.replace(/```/g, '');
                this.schema = formattedSQL;
                this.initSchema = formattedSQL;

                // this.mermaidContent = convertSQLToMermaid(formattedSQL);
                this.tableView = convertSQLToTableView(formattedSQL)
                setTimeout(() => {
                    this.renderMermaid();
                }, 2000);
            },
            error: (error) => {
                console.error('Error while creating database', error);
            }
        }));
    }

    public copyToClipboard(): void {
        const pending = this.clipboard.beginCopy(this.codeEditor.aceGetValue());
        let remainingAttempts = 3;
        const attempt = () => {
            const result = pending.copy();
            if (!result && --remainingAttempts) {
                setTimeout(attempt);
            } else {
                pending.destroy();
                document.getElementById("copy-btn")!.innerText = "Copié !";
            }
        };
        attempt();
    }

    public formatSQL(): void {
        this.codeEditor.formatSQL();
    }


    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    private renderMermaid() {
        if (this.mermaidContainer && this.mermaidContainer.nativeElement) {
            mermaid.default.initialize({startOnLoad: true});
            mermaid.default.contentLoaded();
        } else {
            console.error("⚠️ L'élément Mermaid n'a pas été trouvé dans le DOM !");
        }
    }

    public updateMermaid(newSchema: string): void {
        this.schema = newSchema;
        this.mermaidContent = ""; // Efface le contenu précédent
        this.mermaidIsLoading = true

        this.subscriptions.add(
            timer(1000).pipe(
                switchMap(() => {
                    this.mermaidContent = convertSQLToMermaid(newSchema);

                    if (!this.schema!.replace("\n", " ").trim()) {
                        this.mermaidContent = "";
                    }
                    return of(null);
                }),
                tap(() => {
                    this.ngZone.run(() => {
                        this.cdr.detectChanges();
                        this.mermaidIsLoading = false;
                    });

                    setTimeout(() => {
                        mermaid.default.run();
                    }, 100);
                })
            ).subscribe()
        );
    }

    public changeTab(tab: string): void {
        this.activeTab = tab;
        const tabs = document.querySelectorAll('#generate-tabs > button');
        tabs.forEach((t) => {
            t.classList.remove('active');
        });
        const selectedTab = document.getElementById(tab+"-tab");
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        if (tab === "relation") {
            this.updateMermaid(this.schema!);
        }
        if (tab === "table") {
            this.tableView = convertSQLToTableView(this.schema);
        }
    }

}
