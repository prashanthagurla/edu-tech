import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { CreateStudent } from './create-student/create-student';
import { UpdateStudent } from './update-student/update-student';

export const routes: Routes = [
  { path: 'students', component: StudentList },
  { path: 'create-student', component: CreateStudent },

  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'update-student/:id', component: UpdateStudent },
];
