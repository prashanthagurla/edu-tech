import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentList } from "./student-list/student-list";
import {HttpClientModule} from '@angular/common/http'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentList,HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-project');
}
