import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../../model/student';
import { StudentService } from '../../service/student-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-student.html',
  styleUrl: './update-student.css',
})
export class UpdateStudent implements OnInit {
  student$!: Observable<Student | null>;
  student!: Student;
  id: number = 0;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.student$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.studentService.getStudentById(id);
      }),
      catchError((err) => {
        console.log(err);
        this.router.navigate(['/studentsList']);
        return of(null);
      }),
    );
    this.student$.subscribe((data) => {
      if (data) {
        this.student = data;
      }
    });
  }

  onSubmit(): void {
    console.log('hi');
    console.log('Submitting:', this.student);
    this.updateStudent();
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.student).subscribe({
      next: (data) => {
        console.log('Successfully updated', data);
        Swal.fire({
          icon: 'success',
          title: 'Student Updated',
          text: 'Student updated successfully!',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          this.goToStudentList();
        });
      },
      error: (err) => {
        console.error('failed to update student', err);
        Swal.fire({
          icon: 'error',
          title: 'Upload failed',
          text: err.error.message || 'Something went wrong',
          timer: 2000,
          showConfirmButton: false,
        });
      },
    });
  }

  goToStudentList(): void {
    this.router.navigate(['/studentsList']);
  }
}
