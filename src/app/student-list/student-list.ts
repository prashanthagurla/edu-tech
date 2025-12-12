import { Component } from '@angular/core';
import { Student } from '../student';
import { NgFor } from '@angular/common';
import { StudentService } from '../student-service';


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  students!: Student[];

  constructor(private studentService: StudentService){}

  ngOnInit(): void{
  this.getStudents();
  }
  private getStudents(){
    this.studentService.getStudentsList().subscribe(data => {
      this.students = data;
    })
  }

}
