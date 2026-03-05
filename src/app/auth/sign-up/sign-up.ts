import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatSuffix, MatPrefix } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import e from 'express';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCard,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatAnchor,
    MatSuffix,
    MatPrefix,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {
  signUpForm!: FormGroup;
  hidePassword: boolean = true;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        rollNumber: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.validatePassword },
    );
  }

  onSubmit() {
    console.log('signup clicked');

    if (this.signUpForm.invalid) {
      console.log('not vlaid');
      this.signUpForm.markAllAsTouched();
      this.showToast('Please fill all fields correctly');

      return;
    }
    console.log('valid', this.signUpForm.value);
    console.log(this.signUpForm);
    console.log(this.signUpForm.controls['email'].errors);
    this.isLoading = true;
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;

        console.log('success', res);
      },
      error: (err) => {
        console.log('failed', err);
        this.showToast(err);
        this.isLoading = false;
      },
    });
  }

  validatePassword(signUpForm: FormGroup) {
    const password = signUpForm.get('password')?.value;
    const confirmPassword = signUpForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
  showToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
