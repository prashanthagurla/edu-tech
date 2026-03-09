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
import { ToastService } from '../../service/toast';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
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
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {
  signupForm!: FormGroup;
  hidePassword: boolean = true;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private toast: ToastService,
    private messageService: MessageService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.signupForm = this.fb.group(
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

    if (this.signupForm.invalid) {
      console.log('not vlaid');
      this.signupForm.markAllAsTouched();

      return;
    }
    console.log('valid', this.signupForm.value);
    console.log(this.signupForm);
    console.log(this.signupForm.controls['email'].errors);
    this.isLoading = true;
    this.authService.signUp(this.signupForm.value).subscribe({
      next: (res) => {
        console.log('success', res);
        if (res.success == true) {
          this.signupForm.reset();
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Signup Successful',
            detail: 'User registered successfully',
            life: 3000,
          });
          this.signupForm.reset();
          this.signupForm.markAsPristine();
          this.signupForm.markAsUntouched();
          this.router.navigate(['admin-dashboard']);
        }
      },
      error: (err) => {
        console.log('failed', err);
        // this.toast.error('Signup Failed');
        this.messageService.add({
          severity: 'error',
          summary: 'Signup Failed',
          detail: 'Something went wrong',
          life: 3000,
        });
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
}
