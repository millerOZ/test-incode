import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { UrlIncodeParamsService } from "../../shared/services/UrlIncodeParams/url-incode-params.service";
import { IncodeService } from "../auth/incode.service";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockIncodeService: any;
  let mockUrlIncodeParamsService = jasmine.createSpyObj(
    "UrlIncodeParamsService",
    ["getAllParams", "getParam"]
  );
  beforeEach(() => {
    mockIncodeService = {
      incode: {
        isDesktop: jasmine.createSpy("isDesktop").and.returnValue(false),
      },
      createSession: jasmine
        .createSpy("createSession")
        .and.returnValue(of({ token: "mock-token" })),
    };
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: IncodeService, useValue: mockIncodeService },
        {
          provide: UrlIncodeParamsService,
          useValue: mockUrlIncodeParamsService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set isDesktop from incodeSDK.incode.isDesktop()", () => {
    expect(mockIncodeService.incode.isDesktop).toHaveBeenCalled();
    expect(component.isDesktop).toBe(false);
  });


  it("debe guardar la suscripción en la propiedad subscription", () => {
    component.getSessionIncode();
    expect(component.subscription).toBeDefined();
  });
  it("debe llamar a urlParamsService.getAllParams", async () => {
    mockUrlIncodeParamsService.getAllParams.and.returnValue(
      Promise.resolve({ foo: "bar" })
    );
    await component.getAllParams();
    expect(mockUrlIncodeParamsService.getAllParams).toHaveBeenCalled();
  });

  it("debe mostrar los parámetros en consola si la promesa se resuelve", async () => {
    const params = { test: 123 };
    spyOn(console, "log");
    mockUrlIncodeParamsService.getAllParams.and.returnValue(
      Promise.resolve(params)
    );
    await component.getAllParams();
    expect(console.log).toHaveBeenCalledWith("All URL parameters:", params);
  });

  it("debe mostrar error en consola si la promesa falla", async () => {
    const error = new Error("fail");
    spyOn(console, "error");
    mockUrlIncodeParamsService.getAllParams.and.returnValue(
      Promise.reject(error)
    );
    await component.getAllParams();
    expect(console.error).toHaveBeenCalledWith(
      "Error retrieving URL parameters:",
      error
    );
  });
});
