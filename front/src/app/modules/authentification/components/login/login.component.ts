import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {EmailRegx} from "../../../../core/constants/email-regx";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {SessionService} from "../../../../core/services/session.service";
import {ResponseApi} from "../../interfaces/response-api.interface";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../../shared/components/dialog/dialog.component";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './../authentification.common.scss',
    standalone: false
})
export class LoginComponent implements OnInit, OnDestroy {

    public loginForm!: FormGroup;
    public visible: boolean = false;
    private subscriptions = new Subscription();

    constructor(
        private authService: AuthService,
        private sessionService: SessionService,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private router: Router

    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern(EmailRegx)]],
            password: ['', [Validators.required]],
            consent: [false, [Validators.requiredTrue]]
        });
    }

    ngOnInit() {
    }

    public toggleVisible(): void {
        this.visible = !this.visible;
    }

    public googleLogin(): void {
        return;
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    public login(): void {
        if (this.loginForm.valid) {
            this.subscriptions.add(this.authService.login(this.loginForm.value).subscribe({
                next: (response: ResponseApi) => {
                    this.sessionService.setLogged(true);
                    setTimeout(() => {
                        this.router.navigate(['/']);
                    }, 1000);
                    this.snackBar.open(response.message, '✕', {
                        duration: 100000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                        panelClass: ['success-snackbar'],
                    });
                },
                error: (error: any) => {
                    this.snackBar.open("Erreur: "+error.error.message, '✕', {
                        duration: 100000,
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
