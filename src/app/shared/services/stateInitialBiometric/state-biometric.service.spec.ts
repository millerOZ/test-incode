import { TestBed } from '@angular/core/testing';

import { StateBiometricService } from './state-biometric.service';

describe('StateBiometricService', () => {
  let service: StateBiometricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateBiometricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
