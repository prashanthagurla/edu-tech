import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [NgFor],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  @Input() isPreview: boolean = false;
  courses = [
    {
      title: 'Java full stack',
      description: 'spring boot, hibernate, postgres, AWS',
      duration: '6 Months',
      price: 8000,
      image: 'courses/java.png',
    },
    {
      title: 'Python full stack',
      description: 'Python, Django, postgres, AWS',
      duration: '6 Months',
      price: 8000,
      image: 'courses/python.png',
    },
    {
      title: 'Fullstack Developer',
      description: 'spring boot, hibernate, postgres, AWS, React',
      duration: '8 Months',
      price: 10000,
      image: 'courses/fullstack.png',
    },
    {
      title: 'Frontend Developer',
      description: 'HTML,CSS, JavaScript, Angular',
      duration: '6 Months',
      price: 8000,
      image: 'courses/fe.png',
    },
  ];
}
