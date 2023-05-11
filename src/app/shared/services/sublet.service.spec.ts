import { TestBed } from '@angular/core/testing';

import { SubletService } from './sublet.service';

describe('SubletService', () => {
  let service: SubletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
