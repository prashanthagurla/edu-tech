import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private url = 'http://localhost:3000/api/auth';

  login(loginRequest: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/login`, loginRequest);
  }
}
