import {Component, OnInit} from '@angular/core';
import {TodoService} from './services/todo.service';
import {Todo} from './model/todo.model';
import {SwPush, SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PWA';
  todoList: Todo[] = [];

  constructor(private todoService: TodoService,
              private swUpdate: SwUpdate,
              private swPush: SwPush) {
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available, load new Version?')) {
          window.location.reload();
        }
      });
    }

    this.todoService.todoList().subscribe((data: Todo[]) => {
      this.todoList = data;
    });
  }

  public subscribe() {
    this.swPush.requestSubscription({
      serverPublicKey: 'BP8e-Ieji2LmjEznvXFUt0_ck457L8mH4wS0Wes7_ER5dgWfLl3mwH6UW5XasADxzCNKLhnajzNO2oFoUIUNbuE'
    });
  }

}
