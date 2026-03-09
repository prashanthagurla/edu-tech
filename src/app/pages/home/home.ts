import { Component, Input } from '@angular/core';
import { Courses } from '../../components/courses/courses';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Courses, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isPreviewOnHome: boolean = true;
}
