import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  AfterRenderPhase,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { IncodeService } from '../../auth/incode.service';

@Component({
  selector: 'qr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.scss',
})
export class QrComponent {
  qrUrl: string = '';
  @Input() session: any;
  @ViewChild('redirectToMobile') redirectToMobileRef: ElementRef | undefined;

  constructor(public incodeSDK: IncodeService) {
    afterNextRender(
      async () => {
        this.renderRedirectToMobile();
      },
      { phase: AfterRenderPhase.Write }
    );
  }

  public async renderRedirectToMobile(): Promise<void> {
    await this.incodeSDK.incode.renderRedirectToMobile(this.redirectToMobileRef?.nativeElement, {
      session: this.session,
      url: `${window.location.origin}/suggestion`, //https://biometriadev.previospichincha.com/
      //url: `https://blend-associates-comparable-danger.trycloudflare.com/suggestion`,
      showSms: false,
      onSuccess: () => {
        this.incodeSDK.incode.renderQrCode(this.redirectToMobileRef?.nativeElement, {
          session: this.session,
          onSuccess: (e: any) => {},
        });
      },
    });
  }
}
