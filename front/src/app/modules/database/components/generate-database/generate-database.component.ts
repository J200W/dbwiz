import {Component, OnDestroy, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {Router} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import {BuildDatabase} from "../../interfaces/build-database.interface";
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import * as mermaid from "mermaid";
import "mermaid/dist/mermaid.esm.mjs";
import convertSQLToMermaid from "../../functions/convert-sql-to-mermaid";

@Component({
    selector: 'app-generate-database',
    standalone: false,
    templateUrl: './generate-database.component.html',
    styleUrl: './generate-database.component.scss'
})
export class GenerateDatabaseComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('mermaidContainer', {static: false}) mermaidContainer!: ElementRef;

    private buildRequest: BuildDatabase | undefined;
    public schema: string = '';
    public mermaidContent: string = "";

    constructor(
        private router: Router,
        private databaseService: DatabaseService,
        private clipboard: Clipboard,
        private cdr: ChangeDetectorRef
    ) {
        this.buildRequest = this.router.getCurrentNavigation()?.extras.state as BuildDatabase;
    }

    ngOnInit(): void {
        this.generateDatabase();
        mermaid.default.parseError = function (err: any, hash: any) {
            console.error(err);
        }
    }


    ngOnDestroy(): void {
    }

    public generateDatabase(): void {
        this.databaseService.buildDatabase(this.buildRequest!).subscribe({
            next: (response: any) => {
                var formattedSQL = response.result.replace(/```/g, '');  // Supprimer les accents de code si nécessaire
                this.schema = formattedSQL;

                setTimeout(() => {
                    Prism.highlightAll();  // Mettre à jour tous les blocs de code avec numérotation
                }, 1000);

                this.mermaidContent = convertSQLToMermaid(formattedSQL);
                setTimeout(() => {
                    this.renderMermaid();
                }, 2000);
            },
            error: (error) => {
                console.error('Error while creating database', error);
            }
        });
    }


    public copyToClipboard(): void {
        const schema = document.getElementById("your-schema")!.innerText
        const pending = this.clipboard.beginCopy(schema);
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



    ngAfterViewInit(): void {
        // Forcer la détection des changements Angular avant de rendre Prism
        this.cdr.detectChanges();

        // Déclencher l'application de Prism.js pour afficher le code
    }

    private renderMermaid() {
        if (this.mermaidContainer && this.mermaidContainer.nativeElement) {
            mermaid.default.initialize({startOnLoad: true});
            mermaid.default.contentLoaded();
        } else {
            console.error("⚠️ L'élément Mermaid n'a pas été trouvé dans le DOM !");
        }
    }
}
