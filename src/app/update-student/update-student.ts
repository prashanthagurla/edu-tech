import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-student.html',
  styleUrl: './update-student.css',
})
export class UpdateStudent implements OnInit {
  student: Student = new Student();
  id: number = 0;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getStudentById(this.id).subscribe({
      next: (data) => {
        console.log('Student fetched:', data);
        this.student = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching student', err);
      },
    });
  }

  onSubmit(): void {
    console.log('Submitting:', this.student);
    this.updateStudent();
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.id, this.student).subscribe({
      next: (data) => {
        console.log('Successfully updated', data);
        this.goToStudentList();
      },
      error: (err) => {
        console.error(err);
        alert('Student not updated. Check backend.');
      },
    });
  }

  goToStudentList(): void {
    this.router.navigate(['/students']);
  }
}
