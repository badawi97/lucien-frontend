import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthRoutesEnum } from '../../enums/auth-routes.enum';
import { AuthService } from '../../../../proxy/auth/auth.service';
import { LoginDto } from '../../../../proxy/auth/models';

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
  providers: [
    AuthService
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loading = signal(false);
  error = signal('');

  submit() {
    try {
      if (this.form.invalid) return;

      this.loading.set(true);
      this.error.set('');

      let loginResponse = this.form.value as LoginDto
      this.authService.login(loginResponse).subscribe(response => {
        this.router.navigate([AuthRoutesEnum.dashboard]);
      });
    }
    catch {
      this.error.set('Login failed. Try again.');
    }
    finally {
      this.loading.set(false);
    }
  }
}
