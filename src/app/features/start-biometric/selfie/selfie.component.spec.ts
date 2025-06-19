import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncodeService } from '../../auth/incode.service';
import { SelfieComponent } from './selfie.component';

describe('SelfieComponent', () => {
  let component: SelfieComponent;
  let fixture: ComponentFixture<SelfieComponent>;
  let mockIncodeService: any;
  let mockElementRef: jasmine.SpyObj<ElementRef>;
  beforeEach(() => {
    // Create mock ElementRef
    mockElementRef = jasmine.createSpyObj('ElementRef', [], {
      nativeElement: document.createElement('div'),
    });

    mockIncodeService = {
      incode: {
        renderCamera: jasmine.createSpy('renderCamera').and.returnValue(Promise.resolve()),
        processFace: jasmine.createSpy('processFace').and.returnValue(Promise.resolve()),
      },
    };

    TestBed.configureTestingModule({
      imports: [SelfieComponent],
      providers: [{ provide: IncodeService, useValue: mockIncodeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SelfieComponent);
    component = fixture.componentInstance;

    // Set up component properties
    component.session = 'test-session-token';
    component.cameraRef = mockElementRef;

    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
