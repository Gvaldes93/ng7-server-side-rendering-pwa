import {Component, OnInit} from '@angular/core';
import {NewsletterService} from './services/newsletter.service';
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

  sub: PushSubscription;

  constructor(private newsLetterService: NewsletterService,
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

    this.newsLetterService.newsLettersList().subscribe((data: Todo[]) => {
      this.todoList = data;
    });
  }

  public subscribe() {
    this.swPush.requestSubscription({
      serverPublicKey: 'BP8e-Ieji2LmjEznvXFUt0_ck457L8mH4wS0Wes7_ER5dgWfLl3mwH6UW5XasADxzCNKLhnajzNO2oFoUIUNbuE'
    }).then(sub => {
      this.sub = sub;
      // subscription contains an url to the browser vendor push notification service plus a unique broswer identifier
      // when the server sends a push notification ,e.g with Chrome,
      // it will go to firebase cloud messaging which delivers to all its chrome browsers
      this.newsLetterService.addPushSubscriber(sub).subscribe(res => {
        console.log(res);
      });
    });
  }

  public sendNewsLetter() {
    console.log('Sending Newsletter to all subscribers');
    this.newsLetterService.send().subscribe();
  }
}
