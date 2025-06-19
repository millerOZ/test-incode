import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  AfterRenderPhase,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IncodeService } from '../../auth/incode.service';
@Component({
  selector: 'selfie',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-content">
      <div #selfiecamera></div>
    </div>
  `,
  styles: [``],
})
export class SelfieComponent {
  @Input() session: any;
  @Output() nextStepEvent = new EventEmitter();
  @ViewChild('selfiecamera') cameraRef: ElementRef | undefined;

  constructor(public incodeSDK: IncodeService) {
    afterNextRender(
      async () => {
        await this.renderCamera();
      },
      { phase: AfterRenderPhase.Write }
    );
  }

  private async renderCamera(): Promise<void> {
    console.log('CAMERA SELFIE');

    await this.incodeSDK.incode.renderCamera('selfie', this.cameraRef?.nativeElement, {
      token: this.session,
      showTutorial: true,
      hatCheckEnabled: true,
      lensesCheckEnabled: true,
      maskCheckEnabled: true,
      eyesClosedCheckEnabled: true,
      numberOfTries: 3,
      onError: () => {
        this.nextStepEvent.emit();
      },
      onSuccess: async (e: any) => {
        // processFace is now part of renderCamera for selfie
        this.incodeSDK.incode.processFace({ token: this.session });
        console.log('FIINISHED SELFIE', e);

        this.nextStepEvent.emit(e);
      },
      onLog: (e: any) => {
        console.log('Selfie camera log event', e);
      },
    });
  }

  private async renderVideoCamera(): Promise<void> {
    console.log('CAMERA SELFIE');
    await this.incodeSDK.incode.renderVideoSelfie(
      this.cameraRef?.nativeElement,
      {
        token: this.session,
        showTutorial: true,
        hatCheckEnabled: true,
        lensesCheckEnabled: true,
        maskCheckEnabled: true,
        eyesClosedCheckEnabled: true,
      },
      {
        onError: () => {
          this.nextStepEvent.emit();
        },
        onSuccess: () => {
          // processFace is now part of renderCamera for selfie
          this.incodeSDK.incode.processFace({ token: this.session });
          /* console.log('FIINISHED SELFIE', e);
          this.nextStepEvent.emit(e); */
        },
      }
    );
  }
}
