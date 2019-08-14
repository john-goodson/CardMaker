import { TestBed } from '@angular/core/testing';

import { HotspotDataService } from './hotspot-data.service';

describe('HotspotDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotspotDataService = TestBed.get(HotspotDataService);
    expect(service).toBeTruthy();
  });
});
