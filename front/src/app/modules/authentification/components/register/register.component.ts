import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {EmailRegx} from "../../../../core/constants/email-regx";
import {Observable, Subscription} from "rxjs";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './../authentification.common.scss',
    standalone: false
})
export class RegisterComponent implements OnInit, OnDestroy {

    public registerForm!: FormGroup;
    public visible: boolean = false;
    public visibleConfirm: boolean = false;
    private passwordSubscribe = new Subscription();

    constructor(
        private authService: AuthService,
        // private sessionService: SessionService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email,
                Validators.pattern(EmailRegx)]
            ],
            password: ['', [
                Validators.required,
                Validators.minLength(8)]
            ],
            confirmPassword: ['', [
                Validators.required,
                Validators.minLength(8),
                this.checkPasswords.bind(this)]
            ],
            consent: [false, [Validators.requiredTrue]]
        });

        this.passwordSubscribe.add(this.password?.valueChanges.subscribe(() => {
            this.confirmPassword?.updateValueAndValidity();
        }));
    }

    private checkPasswords(control: AbstractControl): ValidationErrors | null {
        if (!this.registerForm) return null;
        // password == confirmPassword
        return this.password?.value === this.confirmPassword?.value ? null : {passwordMismatch: true};
    }


    public toggleVisible(): void {
        this.visible = !this.visible;
    }

    public toggleVisibleConfirm(): void {
        this.visibleConfirm = !this.visibleConfirm;
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get confirmPassword() {
        return this.registerForm.get('confirmPassword');
    }


    ngOnDestroy() {
        this.passwordSubscribe.unsubscribe();
    }
}
