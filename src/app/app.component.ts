import {Component, OnInit} from '@angular/core';
import {TodoService} from './services/todo.service';
import {Todo} from './model/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PWA';
  todoList: Todo[] = [];

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.todoList().subscribe((data: Todo[]) => {
      this.todoList = data;
    });
  }

}
