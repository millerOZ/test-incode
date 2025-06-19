import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { StateBiometricService } from '../../shared/services/stateInitialBiometric/state-biometric.service';
import { IncodeService } from '../auth/incode.service';
import { VALID_COUNTRY } from '../start-biometric/constants/geolocation.model';
import { LocationComponent } from './location.component';
import { of } from 'rxjs';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;
  let mockIncodeService: jasmine.SpyObj<IncodeService>;
  let mockIncodeSDK: any;
  let mockStateBiometricService: jasmine.SpyObj<StateBiometricService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(() => {
    mockIncodeSDK = {
      incode: {
        sendGeolocation: jasmine.createSpy(),
        sendFingerprint: jasmine.createSpy(),
      },
      createSession: jasmine
            .createSpy("createSession")
            .and.returnValue(of({ token: "mock-token" })),
    };

    const stateBiometricServiceSpy = jasmine.createSpyObj('StateBiometricService', [
      'updateStartBiometric',
    ]);

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    //---------------
    TestBed.configureTestingModule({
      imports: [LocationComponent],
      providers: [
        { provide: IncodeService, useValue: mockIncodeSDK },
        { provide: StateBiometricService, useValue: stateBiometricServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;

    mockIncodeService = TestBed.inject(IncodeService) as jasmine.SpyObj<IncodeService>;
    mockStateBiometricService = TestBed.inject(
      StateBiometricService
    ) as jasmine.SpyObj<StateBiometricService>;

    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('debe llamar a sendGeolocation con el token correcto', async () => {
    mockIncodeSDK.incode.sendGeolocation.and.returnValue(
      Promise.resolve({ location: 'x, y, Colombia' })
    );
    await component.processGeolocation('test-token');
    expect(mockIncodeSDK.incode.sendGeolocation).toHaveBeenCalledWith({ token: 'test-token' });
  });

  describe('processFingerprint', () => {
    it('should call sendFingerprint with the correct token', () => {
      // Arrange
      const token = 'test-fingerprint-token';
      mockIncodeSDK.incode.sendFingerprint.and.returnValue(Promise.resolve());
      spyOn(console, 'log');

      // Act
      component.processFingerprint(token);

      // Assert
      expect(mockIncodeSDK.incode.sendFingerprint).toHaveBeenCalledWith({ token });
    });

    it('should handle error when sendFingerprint fails', async () => {
      // Arrange
      const token = 'test-token';
      const error = new Error('Fingerprint error');
      mockIncodeSDK.incode.sendFingerprint.and.returnValue(Promise.reject(error));
      spyOn(console, 'log');

      // Act
      component.processFingerprint(token);
      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for promise to resolve

      // Assert
      expect(console.log).toHaveBeenCalledWith('error', error);
    });
  });

  describe('onClickCountryValid', () => {
    it('should update biometric state and navigate to suggestion page', () => {
      // Arrange
      spyOn(console, 'log');

      // Act
      component.onClickCountryValid();

      // Assert
      expect(mockStateBiometricService.updateStartBiometric).toHaveBeenCalledWith(true);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/suggestion']);
      expect(console.log).toHaveBeenCalledWith('Navigating to /suggestion');
    });
  });

  it('should set isValidGeolocation to true if location includes VALID_COUNTRY', () => {
    component.redirectIfInvalidCountry(VALID_COUNTRY + ' something');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not navigate if location includes VALID_COUNTRY', () => {
    component.redirectIfInvalidCountry('foo ' + VALID_COUNTRY + ' bar');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
