import { Component, OnInit } from '@angular/core';
import { Student } from '../../model/student';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../service/student-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-student.html',
  styleUrl: './create-student.css',
})
export class CreateStudent implements OnInit {
  student: Student = new Student();
  constructor(
    private studentService: StudentService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  saveStudent() {
    console.log('save student called');
    this.studentService.createStudent(this.student).subscribe(
      (res) => {
        console.log('SUCCESS', res);
        Swal.fire({
          icon: 'success',
          title: 'Student Saved',
          text: 'Student saved successfully!',
          timer: 500,
          showConfirmButton: false,
        }).then(() => {
          this.goToStudentList();
        });
      },
      (err) => {
        console.log('ERROR', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message,
          showConfirmButton: true,
        });
      },
    );
  }

  goToStudentList() {
    this.router.navigate(['/studentsList']);
  }

  onSubmit() {
    console.log('on submit called');
    console.log(this.student);
    this.saveStudent();
  }
}
