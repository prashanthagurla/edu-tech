import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../model/student';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {}

  private refresh$ = new BehaviorSubject<void>(undefined);

  getStudentsList(): Observable<Student[]> {
    return this.http
      .get<{ success: boolean; data: Student[] }>(`${this.baseUrl}/get`)
      .pipe(map((response) => response.data));
  }
  createStudent(student: Student): Observable<Object> {
    return this.http.post(`${this.baseUrl}/add`, student);
  }

  updateStudent(id: Number, student: Student): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, student);
  }
  deleteStudent(id: Number): Observable<string> {
    console.log('hELLO');

    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`);
  }
  getStudentById(id: number): Observable<Student> {
    return this.http
      .get<{ success: boolean; data: Student }>(`${this.baseUrl}/get/${id}`)
      .pipe(map((response) => response.data));
  }

  triggerRefresh() {
    this.refresh$.next();
  }
}
