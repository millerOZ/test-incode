import { ElementRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IncodeService } from "../../auth/incode.service";
import { FrontIdComponent } from "./front-back.component";

describe("FrontComponent", () => {
  let component: FrontIdComponent;
  let fixture: ComponentFixture<FrontIdComponent>;
  let mockIncodeService: any;

  beforeEach(() => {
    mockIncodeService = {
      incode: {
        renderCaptureId: jasmine
          .createSpy("renderCaptureId")
          .and.returnValue(Promise.resolve()),
        processId: jasmine
          .createSpy("processId")
          .and.returnValue(Promise.resolve()),
      },
    };
    TestBed.configureTestingModule({
      imports: [FrontIdComponent],
      providers: [{ provide: IncodeService, useValue: mockIncodeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontIdComponent);
    component = fixture.componentInstance;
    component.session = { token: "test-token" };
    component.cameraRef = new ElementRef(document.createElement("div"));
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call renderCaptureId with correct arguments", async () => {
    await component["renderCaptureId"]();
    expect(mockIncodeService.incode.renderCaptureId).toHaveBeenCalledWith(
      component.cameraRef?.nativeElement,
      jasmine.objectContaining({
        session: component.session,
        forceIdV2: true,
        onError: jasmine.any(Function),
        onSuccess: jasmine.any(Function),
      })
    );
  });
});
