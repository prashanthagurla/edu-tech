import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpRequest } from '../model/sign-up-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServic {
  private baseUrl = 'http://localhost:8081/api/auth';
  constructor(private http: HttpClient) {}
  signup(request: SignUpRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, request);
  }
}
