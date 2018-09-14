import { TestBed, inject } from '@angular/core/testing';

import { NewsletterService } from './newsletter.service';

describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsletterService]
    });
  });

  it('should be created', inject([NewsletterService], (service: NewsletterService) => {
    expect(service).toBeTruthy();
  }));
});
