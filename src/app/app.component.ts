import {Component, OnInit} from '@angular/core';
import {TodoService} from './services/todo.service';
import {Todo} from './model/todo.model';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PWA';
  todoList: Todo[] = [];

  constructor(private todoService: TodoService,
              private swUpdate: SwUpdate) {
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available, load new Vesion?')) {
          window.location.reload();
        }
      });
    }

    this.todoService.todoList().subscribe((data: Todo[]) => {
      this.todoList = data;
    });
  }

}
