import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignUpRequest } from '../../model/sign-up-request';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  signUpRequest: SignUpRequest = new SignUpRequest();

  submint() {}
}
