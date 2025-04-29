import {
    Component,
    OnDestroy,
    OnInit,
    AfterViewInit,
    ElementRef,
    ViewChild,
    ChangeDetectorRef,
    NgZone, Input
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
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ThreadService} from "../../services/thread.service";
import {Message} from "../../../../core/models/message.interface";
import {Thread} from "../../../../core/models/thread.interface";

@Component({
    selector: 'app-generate-database',
    standalone: false,
    templateUrl: './generate-database.component.html',
    styleUrl: './generate-database.component.scss'
})
export class GenerateDatabaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('mermaidContainer', {static: false}) mermaidContainer!: ElementRef;
    @ViewChild('erDiagramDiv', {static: false}) erDiagramDiv!: ElementRef;
    @ViewChild('databaseNameInput', {static: false}) databaseNameInput!: ElementRef;
    @ViewChild(CodeEditorComponent) codeEditor!: CodeEditorComponent;

    private schema: string | null = '';
    public initSchema: string | null = '';
    public tableView: Entity[] | null = []
    public mermaidContent: string = "";
    public mermaidIsLoading: boolean = false;
    public subscriptions: Subscription = new Subscription();
    public sqlFormatError: string | null = null;
    public activeTab: string = 'code';
    public generateForm!: FormGroup;
    public messages: Message[] = [];
    private threadId: string = "";

    constructor(
        private router: Router,
        private databaseService: DatabaseService,
        private threadService: ThreadService,
        private clipboard: Clipboard,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone,
        private formBuilder: FormBuilder,
    ) {
        this.generateForm = this.formBuilder.group({
            databaseName: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.threadId = this.router.url.split('/')[3];
        mermaid.default.parseError = function (err: any) {
            console.error(err);
        }
        this.threadService.checkProject(this.threadId).subscribe({
            next: checkResponse => {
                if (checkResponse.status === "success") {
                    this.threadService.getMessages(this.threadId).subscribe({
                        next: messageResponse => {
                            this.messages = messageResponse;
                            this.generateForm.get('databaseName')!.setValue(checkResponse.data.name);
                        },
                        error: err => {
                            console.error(err);
                        }
                    })
                }
                else {
                    console.log(checkResponse);
                }
            },
            error: (err: any)=> {
                console.error(err);
                this.router.navigate(['/']);
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
        this.subscriptions.add(fromEvent(this.databaseNameInput.nativeElement, 'input').pipe(
            debounceTime(500),
            tap(() => {
                const thread = {
                    id: this.threadId,
                    name: this.databaseNameInput.nativeElement.value,
                    date: ""
                }
                this.threadService.updateThread(thread).subscribe({
                    next: (response: any) => {
                        if (response.status === 'success') {
                            this.generateForm.get('databaseName')!.setValue(this.databaseNameInput.nativeElement.value);
                        }
                    },
                    error: (err: any) => {
                        console.error(err);
                    }
                })
            })
        ).subscribe());
    }

    /*public generateDatabase(): void {
        this.loading = true;
        if (this.generateWithAi) {
            /*this.subscriptions.add(this.databaseService.buildDatabase(this.buildRequest!).subscribe({
                next: (response: any) => {
                    var formattedSQL = response.result.replace(/```/g, '');
                    this.schema = formattedSQL;
                    this.initSchema = formattedSQL;

                    // this.mermaidContent = convertSQLToMermaid(formattedSQL);
                    this.tableView = convertSQLToTableView(formattedSQL)
                    setTimeout(() => {
                        this.renderMermaid();
                        this.loading = false;
                    }, 2000);
                },
                error: (error) => {
                    console.error('Error while creating database', error);
                    setTimeout(() => {
                        this.loading = false;
                    }, 2000);
                }
            }));
            this.subscriptions.add(this.threadService.buildProject().subscribe({
                next:(response: any) => {
                    let threadId = response.threadId;
                    this.subscriptions.add(this.databaseService.generateDatabase(this.buildRequest!, threadId).subscribe({

                    }))
                },
                error: (err: any) => {

                }
            }))
        }
        else {

        }
    }*/

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
