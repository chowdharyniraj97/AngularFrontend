import { TestBed } from '@angular/core/testing';

import { DummyserverService } from './dummyserver.service';

describe('DummyserverService', () => {
  let service: DummyserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
