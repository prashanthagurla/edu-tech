import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignUpRequest } from '../../model/sign-up-request';
import { AuthServic } from '../../service/auth-service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  // signUpRequest: SignUpRequest = new SignUpRequest();
  constructor(private authService: AuthServic) {}

  submit(fullName: string, email: string, password: string, confirmPassword: string) {
    const signUpRequest = new SignUpRequest();
    signUpRequest.fullName = fullName;
    signUpRequest.email = email;
    signUpRequest.password = password;
    signUpRequest.confirmPassword = confirmPassword;
    this.authService.signup(signUpRequest).subscribe({
      next: (res) => {
        console.log('Signup success:', res);
      },
      error: (err) => {
        console.error('signup failed:', err);
      },
    });

    console.log(signUpRequest);
  }
}
