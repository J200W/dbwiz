import {
    AfterViewInit,
    Component,
    ElementRef, EventEmitter,
    Input, OnChanges,
    OnDestroy,
    Output, SimpleChanges,
    ViewChild
} from '@angular/core';
import {debounceTime, fromEvent, Subscription} from "rxjs";
import {ReactiveFormsModule} from "@angular/forms";
import {format} from 'sql-formatter';
import * as ace from "ace-builds";
import { Mode as SQLMode } from 'ace-builds/src-noconflict/mode-sql';
import DraculaTheme from "ace-builds/src-noconflict/theme-dracula";

@Component({
    selector: 'app-code-editor',
    templateUrl: './code-editor.component.html',
    imports: [
        ReactiveFormsModule,
    ],
    styleUrl: './code-editor.component.scss'

})
export class CodeEditorComponent implements OnDestroy, AfterViewInit, OnChanges {

    @Input() language: string | undefined = 'sql';
    @Input() schema: string | null = 'test';

    @Output() schemaChange = new EventEmitter<string>();

    public sub: Subscription = new Subscription();

    @ViewChild("editor") private editor!: ElementRef<HTMLElement>;

    public aceEditor!: ace.Ace.Editor;


    constructor() {}

    ngAfterViewInit() {
        this.aceEditor = ace.edit(this.editor.nativeElement, {
            mode: new SQLMode()
        });

        this.aceEditor.setValue(this.schema ? this.schema : "")
        ace.config.set(
            'basePath',
            "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js",
        );

        this.aceEditor.setOptions({
            mode: 'ace/mode/sql',
            fontSize: 16,
            autoScrollEditorIntoView: true,
            placeholder:
                `CREATE TABLE nom_table (
        nom_attr INT PRIMARY KEY,
        etc...
);`
        });
        this.aceEditor.setAnimatedScroll(false)
        this.aceEditor.setTheme(DraculaTheme)

        this.sub.add(fromEvent(this.aceEditor, "change").pipe(
            debounceTime(500),
        ).subscribe(() => this.schemaChange.emit(this.aceGetValue())));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['schema'] && changes['schema'].currentValue) {
            this.aceEditor.setValue(changes['schema'].currentValue, 1)
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public formatSQL() {
        this.aceEditor.setValue(format(this.aceGetValue(), {language: "mysql"}));
    }

    public aceGetValue(): string {
        return this.aceEditor.getValue();
    }

}
