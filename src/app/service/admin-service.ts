import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/csv-upload';
  constructor(private http: HttpClient) {}

  uploadCsv(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/file`, formData);
  }
}
