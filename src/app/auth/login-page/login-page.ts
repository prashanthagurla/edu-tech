import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth-service';
import { LoginModel } from '../../model/login-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    const loginRequest: LoginModel = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.authService.callLoginBackend(loginRequest).subscribe({
      next: (response) => {
        if (response.success) {
          //TODO navigate to dashboard
          console.log('success', response);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      },
    });

    console.log(this.loginForm.value);
  }

  get f() {
    return this.loginForm.controls;
  }
}

// constructor(private fb: FormBuilder) {
//     // ✅ 2. Initialize loginForm
//     this.loginForm = this.fb.group({
//       email: ['', Validators.required],
//     });
//   }

//-------------------Future Migration for this below code

// loginState$: Observable<UiState> | null = null;

// onSubmit() {
//   const request = {
//     email: this.loginForm.value.email!,
//     password: this.loginForm.value.password!,
//   };

//   this.loginState$ = this.authService.callLoginBackend(request).pipe(
//     map(() => ({
//       loading: false,
//       error: null,
//       success: true,
//     })),
//     catchError(err =>
//       of({
//         loading: false,
//         error: 'Invalid credentials',
//         success: false,
//       })
//     ),
//     startWith({ loading: true, error: null, success: false })
//   );
// }
