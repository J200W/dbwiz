import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {StrongPasswordRegx} from "../../../../core/constants/strong-password-regx";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginComponent {

    public loginForm!: FormGroup;

    constructor(
        private authService: AuthService,
        // private sessionService: SessionService,
        private formBuilder: FormBuilder,
        private router: Router

    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required, Validators.min(3)]],
            password: ['', [Validators.required, Validators.pattern(StrongPasswordRegx)]],
        });
    }

}
