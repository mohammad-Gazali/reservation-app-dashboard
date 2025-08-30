import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { AdminAuthService } from '@shared/api';
import { AUTH_TOKEN_KEY } from '@shared/constants';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatButton } from '@angular/material/button';
import { catchError, throwError } from 'rxjs';
import { LOADING } from '@shared/services/loading.token';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatIcon, MatButton],
  template: `
    <form (ngSubmit)="submit()" [formGroup]="form">
      <mat-icon>lock</mat-icon>
      <h1>
        Login to Dashboard
      </h1>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input [formControl]="form.controls.email" matInput />
        <mat-error>
          @if (form.value.email) {
            Invalid Email
          } @else {
            This field is required
          }
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input [formControl]="form.controls.password" type="password" matInput />
        <mat-error>This field is required</mat-error>
      </mat-form-field>
      <button matButton="tonal">
        Log In
      </button>
    </form>
  `,
  styles: `
    :host {
      height: 100vh;
      display: grid;
      place-items: center;
    }

    mat-icon {
      background: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
      margin: 0 auto;
      border-radius: 50%;
      width: 6rem;
      height: 6rem;
      font-size: 4rem;
      display: grid;
      place-items: center;
    }

    form {
      display: grid;
      width: 100%;
      max-width: 700px;
    }

    h1 {
      text-align: center;
    }
    
    mat-form-field {
      margin-top: 0.5rem;
    }

    button {
      width: 400px;
      margin: 0 auto;
    }
  `,
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private adminAuth = inject(AdminAuthService);
  private auth = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private snackbar = inject(MatSnackBar);
  private router = inject(Router);
  private loading = inject(LOADING);

  protected form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  })

  submit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.adminAuth.login({
      email: this.form.getRawValue().email,
      password: this.form.getRawValue().password,
      fingerprint: null,
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(err => {
        this.loading.set(false);
        return throwError(() => err)
      })
    ).subscribe(res => {
      if (res.success) {
        this.auth.currentUser.set(res.user);
        localStorage.setItem(AUTH_TOKEN_KEY, res.token);
        
        this.snackbar.open("Logged In Successfully", "Dismiss");
        this.router.navigateByUrl("/");
      }

      this.loading.set(false);
    })
  }
}