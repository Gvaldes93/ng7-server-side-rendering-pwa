import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Todo} from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  configUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {
  }

  todoList() {
    return this.http.get(this.configUrl);
  }
}
