import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';

export const routes: Routes = [
    {path:'',component: StudentList},
    {path:'students',component: StudentList},
    {path: '',redirectTo: 'employees', pathMatch: 'full'}

];
