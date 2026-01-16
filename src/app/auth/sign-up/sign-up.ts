import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf, AsyncPipe } from '@angular/common';
import { Observable, of, startWith, catchError, tap, map } from 'rxjs';

import { SignUpRequest } from '../../model/sign-up-request';
import { AuthService } from '../../service/auth-service';

interface UiState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, NgIf, ReactiveFormsModule, AsyncPipe],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  signupForm: FormGroup;
  state$: Observable<UiState> | null = null; // Will be set on submit

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['student'],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    // Reset state
    this.state$ = null;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const values = this.signupForm.value;

    if (values.password !== values.confirmPassword) {
      this.state$ = of({
        loading: false,
        error: 'Passwords do not match.',
        success: false,
      });
      return;
    }

    const request: SignUpRequest = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      role: values.role,
    };

    this.state$ = this.authService.signup(request).pipe(
      tap(() => {
        console.log('Signup successful!');
      }),
      map(() => ({
        loading: false,
        error: null,
        success: true,
      })),
      catchError((err) =>
        of({
          loading: false,
          error: err.error?.message || 'Signup failed. Please try again.',
          success: false,
        })
      ),
      startWith({ loading: true, error: null, success: false })
    );
  }
}
