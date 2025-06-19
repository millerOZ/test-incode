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
import { Subscription } from 'rxjs';
import { IncodeService } from '../../auth/incode.service';
@Component({
  selector: 'front-back-id',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-content">
      <div #frontbackcamera></div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .fldPIp {
        text-align: center;
      }
      :host ::ng-deep .dmlQOO {
        color: #006aff;
        font-family: 'Gilroy-medium', sans-serif;
      }
      :host ::ng-deep .dLaCtM {
        color: #006aff;
      }
    `,
  ],
})
export class FrontIdComponent {
  @Input() session: any;
  @Output() nextStepEvent = new EventEmitter();
  @ViewChild('frontbackcamera') cameraRef: ElementRef | undefined;

  subscription!: Subscription;
  constructor(public incodeSDK: IncodeService) {
    afterNextRender(
      async () => {
        await this.renderCaptureId();
      },
      { phase: AfterRenderPhase.Write }
    );
  }

  private async renderCaptureId(): Promise<void> {
    console.log('CAMERA FRONT', this.session);
    if (this.session) {
      await this.incodeSDK.incode.renderCaptureId(this.cameraRef?.nativeElement, {
        session: this.session,
        forceIdV2: true,
        onSuccess: async () => {
          console.log('ID capture successful!, renderCaptureId');
          //CONSUMIR SERVICIO VALIDACION QR
          await this.incodeSDK.incode.processId({
            token: this.session.token,
          });
          this.nextStepEvent.emit({
            camera: 'selfie',
          });
        },
        onError: (error: any) => {
          console.error('ID capture failed:', error);
        },
      });
    }
  }
  /* TEST OTHER FUNTION */
  private async renderUserConsent(): Promise<void> {
    console.log('renderUserConsent');
    if (this.session) {
      //
      await this.incodeSDK.incode.renderUserConsent(this.cameraRef?.nativeElement, {
        session: this.session,
        title: 'Privacy and Cookies Consent',
        text: 'We use cookies to ensure you get the best experience on our website. By continuing, you agree to our privacy policy.',
        onSuccess: () => {
          this.renderCaptureId();
        },
      });
    }
  }
  private async renderBiometricConsent(): Promise<void> {
    console.log('renderUserConsent');
    if (this.session) {
      await this.incodeSDK.incode.renderBiometricConsent(this.cameraRef?.nativeElement, {
        token: this.session,
        onSuccess: () => {
          this.renderCaptureId();
        },
        onCancel: console.log,
        regulationType: 'US_Illinois',
      });
    }
  }
  private async renderDocumentSelector(): Promise<void> {
    console.log('renderCombinedConsent');
    if (this.session) {
      await this.incodeSDK.incode.renderDocumentSelector(this.cameraRef?.nativeElement, {
        token: this.session,
        onSuccess: () => {
          this.nextStepEvent.emit({
            camera: 'selfie',
          });
        },
        onError: () => {},
      });
    }
  }
}
