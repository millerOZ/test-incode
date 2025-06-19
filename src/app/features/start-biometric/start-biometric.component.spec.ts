import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SuggestionsCameraComponent } from './start-biometric.component';

describe('SuggestionsCameraComponent', () => {
  let component: SuggestionsCameraComponent;
  let fixture: ComponentFixture<SuggestionsCameraComponent>;
  const mockIncodeService = {
    incode: {
      isDesktop: jasmine.createSpy('isDesktop').and.returnValue(false),
      sendGeolocation: jasmine.createSpy('sendGeolocation').and.returnValue(Promise.resolve()),
      sendFingerprint: jasmine.createSpy('sendFingerprint').and.returnValue(Promise.resolve()),
    },

    createSession: jasmine.createSpy('createSession').and.returnValue(of({ token: 'mock-token' })),
    getUrl: jasmine.createSpy('getUrl').and.returnValue(Promise.resolve({ url: 'mock-url' })),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuggestionsCameraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionsCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*   it("should call generateToken and sendGeolocation/sendFingerprint if not desktop", async () => {
    component.isDesktop = false;
    const mockToken = "mock-token";
    const generateTokenSpy = spyOn(
      component.incodeSDK,
      "generateToken"
    ).and.returnValue(Promise.resolve(mockToken));
    spyOn(component, "sendGeolocation");
    spyOn(component, "sendFingerprint");
    await component.onClick();
    expect(generateTokenSpy).toHaveBeenCalled();
    expect(component.sendGeolocation).toHaveBeenCalledWith(mockToken);
    expect(component.sendFingerprint).toHaveBeenCalledWith(mockToken);
  }); */

  /*  it("should not call generateToken if isDesktop is true", async () => {
    component.isDesktop = true;
    const generateTokenSpy = spyOn(component.incodeSDK, "generateToken");
    await component.onClick();
    expect(generateTokenSpy).not.toHaveBeenCalled();
  }); */

  /*  it("should set session to null if step is 2", () => {
    component.step = 2;
    component.session = { test: true };
    component.onStepEvent({});
    expect(component.session).toBeNull();
  }); */

  it('should increment step by 2 if camera is front and skipBackIdCapture is true', () => {
    component.step = 0;
    component.onStepEvent({ camera: 'front', skipBackIdCapture: true });
    expect(component.step).toBe(1);
  });

  it('should increment step by 1 if step < 3 and not skipping back id', () => {
    component.step = 1;
    component.onStepEvent({ camera: 'back', skipBackIdCapture: false });
    expect(component.step).toBe(2);
  });

/*   describe('redirecPageValidContry', () => {
    let routerSpy: jasmine.SpyObj<Router>;
    let originalRouter: any;

    beforeEach(() => {
      routerSpy = jasmine.createSpyObj('Router', ['navigate']);
      // @ts-ignore
      originalRouter = component['router'];
      // @ts-ignore
      component['router'] = routerSpy;
    });

    afterEach(() => {
      // @ts-ignore
      component['router'] = originalRouter;
    });

    /*    it("should navigate to /invalid if location does not include VALID_COUNTRY", () => {
      component.isGeolocationValid = false;
      component.redirectIfInvalidCountry("OTHER_COUNTRY");
      expect(routerSpy.navigate).toHaveBeenCalledWith(["/invalid"]);
      expect(component.isGeolocationValid).toBe(false);
    }); */
    /* 
    it("should set isValidGeolocation to true if location includes VALID_COUNTRY", () => {
      component.isGeolocationValid = false;
      component.redirectIfInvalidCountry(VALID_COUNTRY + " something");
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      expect(component.isGeolocationValid).toBe(true);
    });

    it("should not navigate if location includes VALID_COUNTRY", () => {
      component.redirectIfInvalidCountry("foo " + VALID_COUNTRY + " bar");
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    }); 
  }); */

  /*  it("should call sendGeolocation and then redirecPageValidContry with location", async () => {
    const token = "mock-token";
    const mockLocation = "ECUADOR";
    const mockResponse = { location: mockLocation };
    component.incodeSDK = {
      incode: {
        sendGeolocation: jasmine
          .createSpy("sendGeolocation")
          .and.returnValue(Promise.resolve(mockResponse)),
      },
    } as any;
    spyOn(component, "redirectIfInvalidCountry");

    await component.sendGeolocation(token);

    expect(component.incodeSDK.incode.sendGeolocation).toHaveBeenCalledWith({
      token,
    });
    expect(component.redirectIfInvalidCountry).toHaveBeenCalledWith(
      mockLocation
    );
  }); */

  /* it("should call sendFingerprint with token and handle error", async () => {
    const token = "mock-token";
    const mockError = new Error("fail");
    component.incodeSDK = {
      incode: {
        sendFingerprint: jasmine
          .createSpy("sendFingerprint")
          .and.returnValue(Promise.reject(mockError)),
      },
    } as any;
    spyOn(console, "log");

    await component.sendFingerprint(token);

    expect(component.incodeSDK.incode.sendFingerprint).toHaveBeenCalledWith({
      token,
    });
    expect(console.log).toHaveBeenCalledWith("error", mockError);
  }); */
});
