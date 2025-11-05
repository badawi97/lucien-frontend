import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        RouterTestingModule.withRoutes([]),  // Mock Router
        LoginComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('should validate email and password fields', () => {
    const email = component.form.controls['email'];
    const password = component.form.controls['password'];

    email.setValue('');
    password.setValue('');
    expect(component.form.invalid).toBeTrue();

    email.setValue('invalid-email');
    expect(email.valid).toBeFalse();

    email.setValue('test@example.com');
    password.setValue('123456');
    expect(component.form.valid).toBeTrue();
  });

  it('should navigate to dashboard after successful login', fakeAsync(() => {
    spyOn(router, 'navigate');

    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');

    component.submit();
    expect(component.loading()).toBeTrue();

    tick(1000);  // simulate async delay

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.loading()).toBeFalse();
  }));

  it('should set error if login fails (simulate error)', fakeAsync(() => {
    spyOn(router, 'navigate').and.throwError('Navigation failed'); // simulate failure

    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');

    try {
      component.submit();
      tick(1000);
    } catch (e) {
      // Expected
    }

    expect(component.error()).toBe('Login failed. Try again.');
    expect(component.loading()).toBeFalse();
  }));
});
