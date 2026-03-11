import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private url = 'http://localhost:3200/auth';

  login(loginRequest: FormData): Observable<any> {
    console.log('in service', loginRequest);
    return this.httpClient.post<any>(`${this.url}/login`, loginRequest);
  }
  signUp(signUpRequest: FormData) {
    console.log('in service', signUpRequest);
    return this.httpClient.post<any>(`${this.url}/signUp`, signUpRequest);
  }
  handleLoginResponse(data: any) {}
}
