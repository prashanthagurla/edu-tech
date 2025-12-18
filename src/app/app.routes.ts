import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { CreateStudent } from './create-student/create-student';
import { UpdateStudent } from './update-student/update-student';
import { SignIn } from './auth/sign-in/sign-in';
import { SignUp } from './auth/sign-up/sign-up';

export const routes: Routes = [
  { path: 'signin', component: SignIn },
  { path: 'signup', component: SignUp },
  { path: 'students', component: StudentList },
  { path: 'create-student', component: CreateStudent },
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'update-student/:id', component: UpdateStudent },
];
