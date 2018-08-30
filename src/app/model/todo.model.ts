export class Todo {

  id: number;
  complete: string;
  title: string;

  constructor (id: number, complete: string, title: string) {
    this.id = id;
    this.complete = complete;
    this.title = title;
  }
}
