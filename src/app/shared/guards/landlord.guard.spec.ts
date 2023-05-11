import { TestBed } from '@angular/core/testing';

import { LandlordGuard } from './landlord.guard';

describe('LandlordGuard', () => {
  let guard: LandlordGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LandlordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
