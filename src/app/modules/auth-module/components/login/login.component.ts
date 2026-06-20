import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthRoutesEnum } from '../../enums/auth-routes.enum';
import { LoginDto } from '../../../../proxy/model/models';
import { AuthService } from '../../../../proxy/api/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule
  ],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly authService = inject(AuthService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loading = signal(false);
  error = signal('');

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const loginRequest = this.form.getRawValue() as LoginDto;

    this.authService
      .apiAuthLoginPost(loginRequest)
      .pipe(
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess === false) {
            this.error.set(response.message ?? 'Login failed. Try again.');
            return;
          }

          void this.router.navigateByUrl(`/${AuthRoutesEnum.dashboard}`, {
            state: { skipAuthRefresh: true },
          });
        },
        error: () => {
          this.error.set('Invalid email or password.');
        },
      });
  }
}
