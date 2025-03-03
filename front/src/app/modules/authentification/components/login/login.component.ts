import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {EmailRegx} from "../../../../core/constants/email-regx";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './../authentification.common.scss',
    standalone: false
})
export class LoginComponent {

    public loginForm!: FormGroup;
    public visible: boolean = false;

    constructor(
        private authService: AuthService,
        // private sessionService: SessionService,
        private formBuilder: FormBuilder,
        private router: Router

    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern(EmailRegx)]],
            password: ['', [Validators.required]],
            consent: [false, [Validators.requiredTrue]]
        });
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

}
