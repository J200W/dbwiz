import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-build-database',
    templateUrl: './build-database.component.html',
    styleUrl: './build-database.component.scss',
    standalone: false,
})
export class BuildDatabaseComponent implements OnInit, OnDestroy {
    public buildForm!: FormGroup;
    private step: number = 1;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.buildForm = this.formBuilder.group({
            description: ['', Validators.required],
            contraintes: [''],
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
}
