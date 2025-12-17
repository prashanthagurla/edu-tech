import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:8081/api/students'

    constructor(private http: HttpClient) {}

    getStudentsList(): Observable<Student[]>{
      return this.http.get<Student[]>(`${this.baseUrl}/get`)
    }
    createStudent(student: Student): Observable<any>{
      return this.http.post(`${this.baseUrl}/add`,student)
    }

    updateStudent(student: Student): Observable<any>{
      return this.http.put(`${this.baseUrl}/update`,student)
    }

}
