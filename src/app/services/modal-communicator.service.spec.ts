import { TestBed, inject } from '@angular/core/testing';

import { ModalCommunicatorService } from './modal-communicator.service';

describe('ModalCommunicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalCommunicatorService]
    });
  });

  it('should be created', inject([ModalCommunicatorService], (service: ModalCommunicatorService) => {
    expect(service).toBeTruthy();
  }));
});
