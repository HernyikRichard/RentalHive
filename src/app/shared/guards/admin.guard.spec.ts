import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from './admin.guard';

describe('AdminAuthGuardGuard', () => {
  let guard: AdminAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
