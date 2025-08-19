import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormHelper } from '../../../helpers/form-helpers';
import { InputComponent, TypesInput } from "../../../helpers/components/input/input.component";
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  fb = inject(FormBuilder);
  formHelpers = FormHelper;
  types = TypesInput;
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  success = signal<null | string>(null)

  onSubmit(){
    if(this.loginForm.invalid) return;
    this.authService.login(this.loginForm.controls.email.value!, this.loginForm.controls.password.value!).subscribe({
      next: (res => this.router.navigateByUrl('')),
      error: ((err: HttpErrorResponse) => this.success.set(err.error.message))
    });
  }
}
