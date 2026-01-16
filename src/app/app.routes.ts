import { Routes } from '@angular/router';
import { StudentList } from './components/student-list/student-list';
import { CreateStudent } from './components/create-student/create-student';
import { UpdateStudent } from './components/update-student/update-student';
import { SignUp } from './auth/sign-up/sign-up';
import { LoginPage } from './auth/login-page/login-page';
import { Home } from './components/home/home';
import { Courses } from './components/courses/courses';

export const routes: Routes = [
  { path: 'signup', component: SignUp },
  { path: 'students', component: StudentList },
  { path: 'create-student', component: CreateStudent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'update-student/:id', component: UpdateStudent },
  { path: 'login-page', component: LoginPage },
  { path: 'home', component: Home },
  { path: 'courses', component: Courses },
];
