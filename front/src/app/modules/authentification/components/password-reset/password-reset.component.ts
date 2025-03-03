import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {EmailRegx} from "../../../../core/constants/email-regx";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './../authentification.common.scss',
  standalone: false,
})

export class PasswordResetComponent {
  public resetForm!: FormGroup;

  constructor(
      private authService: AuthService,
      // private sessionService: SessionService,
      private formBuilder: FormBuilder,
      private router: Router

  ) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(EmailRegx)]],
    });
  }

  get email() {
    return this.resetForm.get('email');
  }
}
