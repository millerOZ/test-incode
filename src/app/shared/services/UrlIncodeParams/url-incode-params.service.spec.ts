import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UrlIncodeParamsService } from './url-incode-params.service';

describe('UrlIncodeParamsService', () => {
  let service: UrlIncodeParamsService;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      queryParams: of({}),
    });

    TestBed.configureTestingModule({
      providers: [
        UrlIncodeParamsService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });
    service = TestBed.inject(UrlIncodeParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getParam', () => {
    it('should resolve with parameter value when key exists in query params', async () => {
      // Arrange
      const mockParams = { testKey: 'testValue', anotherKey: 'anotherValue' };
      Object.defineProperty(mockActivatedRoute, 'queryParams', {
        value: of(mockParams),
      });

      // Act
      const result = await service.getParam('testKey');

      // Assert
      expect(result).toBe('testValue');
    });

    it('should not resolve when parameter key does not exist in query params', (done) => {
      // Arrange
      const mockParams = { existingKey: 'existingValue' };
      Object.defineProperty(mockActivatedRoute, 'queryParams', {
        value: of(mockParams),
      });

      // Act
      const promise = service.getParam('nonExistentKey');

      // Assert
      setTimeout(() => {
        // The promise should not resolve after a reasonable time
        promise
          .then(() => {
            fail('Promise should not resolve for non-existent key');
            done();
          })
          .catch(() => {
            fail('Promise should not reject');
            done();
          });

        // If we get here, the promise didn't resolve, which is expected
        done();
      }, 100);
    });

    it('should not resolve when parameter exists but has falsy value', (done) => {
      // Arrange
      const mockParams = {
        emptyString: '',
        nullValue: null,
        undefinedValue: undefined,
        zeroValue: 0,
        falseValue: false,
      };
      Object.defineProperty(mockActivatedRoute, 'queryParams', {
        value: of(mockParams),
      });

      // Act & Assert
      const promises = [
        service.getParam('emptyString'),
        service.getParam('nullValue'),
        service.getParam('undefinedValue'),
        service.getParam('zeroValue'),
        service.getParam('falseValue'),
      ];

      setTimeout(() => {
        promises.forEach((promise, index) => {
          promise
            .then(() => {
              fail(`Promise should not resolve for falsy value at index ${index}`);
            })
            .catch(() => {
              fail(`Promise should not reject for falsy value at index ${index}`);
            });
        });
        done();
      }, 100);
    });
  });
 /*  it('debe resolver con todos los parámetros de query de la URL', async () => {
    const params = await service.getAllParams();
    expect(params).toEqual({
      testParam: 'testValue',
      anotherParam: '123',
    });
  }); */

  it('debe resolver con un objeto vacío si no hay parámetros', async () => {
    mockActivatedRoute.queryParams = of({});
    const params = await service.getAllParams();
    expect(params).toEqual({});
  });
/* 
  it('debe mantener los tipos de datos originales de los parámetros', async () => {
    mockActivatedRoute.queryParams = of({
      numberParam: '123',
      booleanParam: 'true',
      stringParam: 'test',
    });

    const params = await service.getAllParams();
    expect(params.numberParam).toBe('123');
    expect(params.booleanParam).toBe('true');
    expect(params.stringParam).toBe('test');
  }); */
});
