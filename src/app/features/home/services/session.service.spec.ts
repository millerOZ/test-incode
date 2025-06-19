import { TestBed } from "@angular/core/testing";
import { MockSessionService } from "./session.service";
import { take } from "rxjs";

describe("MockSessionService", () => {
  let service: MockSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockSessionService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it('debe retornar un observable de ConfigResponse', (done) => {
    service
      .validateSessionIncode()
      .pipe(take(1))
      .subscribe((res) => {
        expect(res).toEqual({ activeQr: true, activeIncode: true });
        done();
      });
  });

  it('debe tener activeQr en true en la respuesta', (done) => {
    service
      .validateSessionIncode()
      .pipe(take(1))
      .subscribe((res) => {
        expect(res.activeQr).toBeTrue();
        done();
      });
  });

  it('debe tener activeIncode en true en la respuesta', (done) => {
    service
      .validateSessionIncode()
      .pipe(take(1))
      .subscribe((res) => {
        expect(res.activeIncode).toBeTrue();
        done();
      });
  });
});
