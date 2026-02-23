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
    console.log('get all student front end service called');

    return this.http.get<Student[]>(`${this.baseUrl}/get`);
  }
  createStudent(student: Student): Observable<Object> {
    return this.http.post(`${this.baseUrl}/add/student`, student);
  }

  updateStudent(student: Student | null): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update`, student);
  }
  deleteStudent(id: Number): Observable<string> {
    console.log('hELLO');

    return this.http.delete<string>(`${this.baseUrl}/delete/${id}`);
  }
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/get/${id}`);
  }

  triggerRefresh() {
    this.refresh$.next();
  }
}
