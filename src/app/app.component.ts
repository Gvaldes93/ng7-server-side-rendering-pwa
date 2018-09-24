import {Component, OnInit} from '@angular/core';
import {NewsletterService} from './services/newsletter.service';
import {Todo} from './model/todo.model';
import {SwPush, SwUpdate} from '@angular/service-worker';
import { environment } from './../environments/environment';

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

  public subscribeToNewsletter() {
    this.swPush.requestSubscription({
      serverPublicKey: environment.webPush.publicKey
    }).then(sub => {
      this.sub = sub;
      // subscription contains an url to the browser vendor push notification service plus a unique browser identifier
      // when the server sends a push notification, e.g with Chrome,
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
