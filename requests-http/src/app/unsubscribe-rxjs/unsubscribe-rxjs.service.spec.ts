/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnsubscribeRxjsService } from './unsubscribe-rxjs.service';

describe('Service: UnsubscribeRxjs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsubscribeRxjsService]
    });
  });

  it('should ...', inject([UnsubscribeRxjsService], (service: UnsubscribeRxjsService) => {
    expect(service).toBeTruthy();
  }));
});
