import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpRequest } from '../model/sign-up-request';
import { Observable } from 'rxjs';
import { LoginModel } from '../model/login-model';
import { AuthResponse } from '../model/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) {}
  signup(request: SignUpRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, request);
  }
  test(request: SignUpRequest): Observable<any> {
    return this.http.get(`${this.baseUrl}/hello`);
  }
  callLoginBackend(loginRequest: LoginModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, loginRequest);
  }
}
``;
