import { TestBed } from '@angular/core/testing';

import { SubletGuard } from './sublet.guard';

describe('SubletGuard', () => {
  let guard: SubletGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SubletGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
