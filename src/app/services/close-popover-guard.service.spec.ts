import { TestBed } from '@angular/core/testing';

import { ClosePopoverGuardService } from './close-popover-guard.service';

describe('ClosePopoverGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClosePopoverGuardService = TestBed.get(ClosePopoverGuardService);
    expect(service).toBeTruthy();
  });
});
