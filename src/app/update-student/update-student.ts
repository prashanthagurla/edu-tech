import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../student';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-update-student',
  imports: [FormsModule],
  templateUrl: './update-student.html',
  styleUrl: './update-student.css',
})
export class UpdateStudent {
  student: Student = new Student();

  onSubmit(){

  }

}
