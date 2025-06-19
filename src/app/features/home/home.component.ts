import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StateBiometricService } from '../../shared/services/stateInitialBiometric/state-biometric.service';
import { UrlIncodeParamsService } from '../../shared/services/UrlIncodeParams/url-incode-params.service';
import { IncodeService } from '../auth/incode.service';
import { QrComponent } from './qr/qr.component';
import { MockSessionService } from './services/session.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, QrComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  session: any = null;
  isDesktop: boolean = true;
  subscription!: Subscription;
  private readonly configService = inject(MockSessionService);
  private readonly incodeSDK = inject(IncodeService);
  private readonly stateBiometricService = inject(StateBiometricService);

  constructor(private readonly urlParamsService: UrlIncodeParamsService) {}

  ngOnInit() {
    this.isDesktop = this.incodeSDK.incode.isDesktop();
    this.validateSessionIncode();
    //CONSUMIR SERVICIO PARA OBTERNER SESSION
  }

  getSessionIncode() {
    this.subscription = this.incodeSDK.createSession().subscribe((data) => {
      this.session = data;
      //console.log("Session data:", this.session);
      
    });
  }
  //recuperar los parametros de la url llamada desde onb pibank
  // obtener token para usar el SDK
  async getAllParams() {
    try {
      await this.urlParamsService.getAllParams().then((params: any) => {
        console.log('All URL parameters:', params);
      });
    } catch (error) {
      console.error('Error retrieving URL parameters:', error);
    }
  }
  validateSessionIncode() {
    if (this.isDesktop) {
      this.configService.validateSessionIncode().subscribe({
        next: (response) => {
          if (response.activeIncode) {
            this.getSessionIncode();
          }
        },
        error: (err) => {
          console.error('Error in validateSessionIncode:', err);
        },
      });
    }
  }
}
