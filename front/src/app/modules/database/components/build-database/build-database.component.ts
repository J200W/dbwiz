import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {trigger} from "@angular/animations";

@Component({
    selector: 'app-build-database',
    templateUrl: './build-database.component.html',
    styleUrl: './build-database.component.scss',
    standalone: false,
})
export class BuildDatabaseComponent implements OnInit, OnDestroy {
    public buildForm!: FormGroup;
    private step: number = 1;
    public langages: string[] = ['MySQL', 'PostgreSQL', 'SQLite', 'Oracle', 'SQL Server'];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.buildForm = this.formBuilder.group({
            description: ['', Validators.required],
            contrainte: [''],
            langage: ['', Validators.required],
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    public nextStep(): void {
        this.step++;
    }

    public previousStep(): void {
        this.step--;
    }

    get currentStep(): number {
        return this.step;
    }

    get description(): AbstractControl {
        return this.buildForm.get('description')!;
    }

    get contrainte(): AbstractControl {
        return this.buildForm.get('contrainte')!;
    }

    get langage(): AbstractControl {
        return this.buildForm.get('langage')!;
    }

    public onLangageChange(event: any): void {
        this.langage.setValue(event.target.value);
        console.log(this.langage.value)
    }
}
