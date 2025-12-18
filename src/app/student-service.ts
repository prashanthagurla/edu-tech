import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:8081/api/students';

  constructor(private http: HttpClient) {}

  private refresh$ = new BehaviorSubject<void>(undefined);

  getStudentsList(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/get`);
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
  getStudentById(id: Number): Observable<Student> {
    console.log('im called');
    return this.http.get<Student>(`${this.baseUrl}/getById/${id}`);
  }

  triggerRefresh() {
    this.refresh$.next();
  }
}
