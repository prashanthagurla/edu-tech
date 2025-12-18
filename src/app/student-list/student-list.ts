import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { StudentService } from '../service/student-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  private studentService = inject(StudentService);
  private router = inject(Router);

  students$ = this.studentService.getStudentsList();

  updateStudent(id: number) {
    this.router.navigate(['update-student', id]);
  }

  deleteStudent(id: number) {
    const isConfirm = confirm('Are you sure you want to delete the student?');
    if (isConfirm) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          alert('Student deleted successfully!');
          this.studentService.triggerRefresh();
        },
        error: (err) => {
          console.error(err);
          alert('Delete failed');
        },
      });
    }
  }
}

// OLD VERSION
// import { Component } from '@angular/core';
//  import { Student } from '../student';
//   import { NgFor } from '@angular/common';
//   import { StudentService } from '../student-service';
//    import { Router } from '@angular/router';
//     @Component({ selector: 'app-student-list',
//       standalone: true,
//       imports: [NgFor], templateUrl: './student-list.html',
//       styleUrl: './student-list.css', })
//       export class StudentList { students!: Student[];
//          constructor(private studentService: StudentService, private router: Router ){} n
//          gOnInit(): void{ this.getStudents(); }
//          private getStudents(){ this.studentService.getStudentsList().subscribe(data => { this.students = data; }) }
//          updateStudent(id: number){ this.router.navigate(['update-student',id]); }
//           deleteStudent(id:number){ this.router.navigate(['']) } }
