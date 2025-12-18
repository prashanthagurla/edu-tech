import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../service/student-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-student.html',
  styleUrl: './create-student.css',
})
export class CreateStudent implements OnInit {
  student: Student = new Student();
  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {}

  saveStudent() {
    this.studentService.createStudent(this.student).subscribe(
      (data) => {
        console.log('SUCCESS', data);
        this.goToStudentList();
      },
      (error) => {
        console.log(error);
        alert('Student not saved. check backend');
      }
    );
  }

  goToStudentList() {
    this.router.navigate(['/students']);
  }

  onSubmit() {
    console.log(this.student);
    this.saveStudent();
  }
}
