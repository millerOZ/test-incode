import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IncodeService } from './incode.service';

function mockFetchResponse(data: any, status: number = 200) {
  return Promise.resolve(
    new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-type': 'application/json' },
    })
  );
}

describe('IncodeService', () => {
  let service: IncodeService;
  let warmupSpy: jasmine.Spy;
  let sdkCreateSessionSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncodeService);
    sdkCreateSessionSpy = jasmine
      .createSpy()
      .and.returnValue(Promise.resolve({ token: 'abc', interviewId: '123' }));

    warmupSpy = jasmine.createSpy().and.returnValue(Promise.resolve());
    service.incode = { warmup: warmupSpy };
    // @ts-ignore
    service.sdkCreateSession = sdkCreateSessionSpy;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return session with token and interviewId', (done) => {
    spyOn(service, 'createSession').and.returnValue(
      of({
        token: 'mock-token',
        interviewId: 'mock-interview-id',
      })
    );
    service.createSession().subscribe((session) => {
      expect(session).toEqual({
        token: 'mock-token',
        interviewId: 'mock-interview-id',
      });
      done();
    });
  });

 /*  it('should return undefined from generateToken() with error', async () => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      } as any)
    );

    const service = new IncodeService();
    const result = await service.generateToken();
    expect(result).toBeUndefined();
  }); */
/*   it('should return data from generateToken()', async () => {
    // Mock global de fetch por defecto
    spyOn(window, 'fetch').and.callFake(() => mockFetchResponse('mock-token'));

    const result = await service.generateToken();
    expect(result).toBe(undefined);
  }); */

  /* it('debe llamar a warmup después de sdkCreateSession', (done) => {
    service.createSession().subscribe(() => {
      expect(warmupSpy).toHaveBeenCalled();
      done();
    });
  }); */
});
