import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncodeService } from '../../auth/incode.service';
import { QrComponent } from './qr.component';

describe('QrComponent', () => {
  let component: QrComponent;
  let fixture: ComponentFixture<QrComponent>;
  let incodeServiceSpy: jasmine.SpyObj<IncodeService>;
  let mockRef: any;
  let mockIncodeSDK: any;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('IncodeService', ['getUrl'], {
      incode: {
        renderRedirectToMobile: jasmine
          .createSpy('renderRedirectToMobile')
          .and.returnValue(Promise.resolve()),
      },
    });
    mockRef = { nativeElement: {} };
    mockIncodeSDK = {
      incode: {
        renderRedirectToMobile: jasmine.createSpy().and.returnValue(Promise.resolve()),
        renderQrCode: jasmine.createSpy(),
      },
    };
    TestBed.configureTestingModule({
      imports: [QrComponent],
      providers: [{ provide: IncodeService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(QrComponent);
    component = fixture.componentInstance;
    component.redirectToMobileRef = mockRef;
    component.incodeSDK = mockIncodeSDK;
    incodeServiceSpy = TestBed.inject(IncodeService) as jasmine.SpyObj<IncodeService>;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar a renderRedirectToMobile con los parámetros correctos', async () => {
    await component.renderRedirectToMobile();
    expect(mockIncodeSDK.incode.renderRedirectToMobile).toHaveBeenCalledWith(
      mockRef.nativeElement,
      jasmine.objectContaining({
        session: component.session,
        url: jasmine.any(String),
        showSms: false,
        onSuccess: jasmine.any(Function),
      })
    );
  });

  it('debe llamar a renderQrCode en el callback onSuccess', async () => {
    let onSuccessFn: Function = () => {};
    interface RenderRedirectToMobileOptions {
      session: any;
      url: string;
      showSms: boolean;
      onSuccess: () => void;
    }

    interface RenderQrCodeOptions {
      session: any;
      onSuccess: () => void;
    }

    type RenderRedirectToMobileFn = (
      element: any,
      opts: RenderRedirectToMobileOptions
    ) => Promise<void>;

    type RenderQrCodeFn = (
      element: any,
      opts: RenderQrCodeOptions
    ) => void;

    mockIncodeSDK.incode.renderRedirectToMobile.and.callFake(
      (_: any, opts: RenderRedirectToMobileOptions) => {
      onSuccessFn = opts.onSuccess;
      return Promise.resolve();
      }
    );

    await component.renderRedirectToMobile();
    onSuccessFn();

    expect(mockIncodeSDK.incode.renderQrCode).toHaveBeenCalledWith(
      mockRef.nativeElement,
      jasmine.objectContaining({
        session: component.session,
        onSuccess: jasmine.any(Function),
      })
    );
  });

});
