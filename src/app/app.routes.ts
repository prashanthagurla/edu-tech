import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { CreateStudent } from './create-student/create-student';

export const routes: Routes = [
   
    {path:'students',component: StudentList},
    {path:'create-student',component: CreateStudent},
    {path: '',redirectTo: 'students', pathMatch: 'full'}

];
