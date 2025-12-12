import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';

export const routes: Routes = [
    {path:'',component: StudentList},
    {path:'student',component: StudentList}
];
