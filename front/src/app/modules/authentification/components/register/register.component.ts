import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {EmailRegx} from "../../../../core/constants/email-regx";
import {Subscription} from "rxjs";
import {RegisterRequest} from "../../interfaces/register-request.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SessionService} from "../../../../core/services/session.service";

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
    private subscriptions = new Subscription();

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private sessionService: SessionService,
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

        this.subscriptions.add(this.password?.valueChanges.subscribe(() => {
            this.confirmPassword?.updateValueAndValidity();
        }));
    }

    private checkPasswords(): ValidationErrors | null {
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

    public register(): void {
        if (this.registerForm.valid) {
            const registerRequest: RegisterRequest = {
                email: this.email?.value,
                password: this.password?.value,
                firstname: '',
                lastname: ''
            };

            this.subscriptions.add(this.authService.register(registerRequest).subscribe({
                next: (response)=> {
                    setTimeout(() => {
                        this.router.navigate(['/']);
                    }, 1000);
                    this.sessionService.setLogged(true);
                    this.snackBar.open(response.message, '✕', {
                        duration: 4000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        panelClass: ['success-snackbar'],
                    });
                },
                error: (error) => {
                    this.snackBar.open("Erreur: "+error.error.message, '✕', {
                        duration: 3000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        panelClass: ['error-snackbar'],
                    });
                    console.error(error);
                }
            }));
        }
    }


    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
