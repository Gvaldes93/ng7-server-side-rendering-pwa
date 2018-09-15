import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  configUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) {
  }

  newsLettersList() {
    return this.http.get(this.configUrl + '/api/newsletters');
  }

  addPushSubscriber(sub: PushSubscription) {
    return this.http.post(this.configUrl + '/api/notifications', sub);
  }

  send() {
    return this.http.post(this.configUrl + '/api/newsletter', null);
  }
}
