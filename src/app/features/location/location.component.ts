import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StateBiometricService } from '../../shared/services/stateInitialBiometric/state-biometric.service';
import { IncodeService } from '../auth/incode.service';
import { VALID_COUNTRY } from '../start-biometric/constants/geolocation.model';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container">
      <img
        [src]="imagePath()"
        [alt]="nameImg()"
      />
      <h1>{{ title() }}</h1>
      @if(isColombiaLocation()){
      <button
        type="button"
        class="btn-primary"
        (click)="onClickCountryValid()"
      >
        Continuar
      </button>
      } @else {
      <button
        type="button"
        class="btn-primary"
        (click)="onClick()"
        aria-label="Determinar ubicación"
      >
        Continuar
      </button>
      }
    </section>
  `,
  styles: [
    `
      button {
        width: 158px;
        font-size: 20px;
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      h1 {
        font-family: 'Gilroy-Bold', sans-serif;
        font-size: 25px;
        font-weight: 400;
        text-align: center;
        padding-bottom: 84px;
      }
      img {
        height: 202px;
        width: 202px;
        padding-top: 127px;
      }
    `,
  ],
})
export class LocationComponent {
  public incodeSDK = inject(IncodeService);
  private readonly stateBiometricService = inject(StateBiometricService);
  private readonly router = inject(Router);

  private readonly _nameImg = signal<string>('location');
  private readonly _title = signal<string>('Necesitamos determinar tu ubicación');

  readonly nameImg = this._nameImg.asReadonly();
  readonly title = this._title.asReadonly();

  readonly isColombiaLocation = computed(() => this._title().toLowerCase().includes('colombia'));
  readonly imagePath = computed(() => `assets/img/${this._nameImg()}.svg`);

  isDisabled = true;
  constructor() {}

  processGeolocation(token: string) {
    this.incodeSDK.incode
      .sendGeolocation({ token })
      .then((res: any) => {
        console.log('Geolocation sent successfully:', res);

        if (res.location) {
          this.isDisabled = false;
          const locationData = this.parseLocationString(res.location);
          this.updateLocationDisplay(locationData);
          this.redirectIfInvalidCountry(res.location);
        }
      })
      .catch((err: Error) => {
        console.error('error', err);
      });
  }
  redirectIfInvalidCountry(location: string) {
    if (!location.includes(VALID_COUNTRY)) {
      console.log('INVALID COUNTRY');
      this.router.navigate(['/invalid']);
    }
  }

  parseLocationString(location: string) {
    const locationParts = location.split(',');
    const city = locationParts[1]?.split(' ')[2];
    const country = locationParts[2]?.trim();

    return { city, country };
  }
  updateLocationDisplay(locationData: any) {
    this._title.set(`Actualmente está en: ${locationData.city}, ${locationData.country}`);
    this._nameImg.set('location_2');
  }
  processFingerprint(token: string) {
    this.incodeSDK.incode.sendFingerprint({ token }).catch((error: Error) => {
      console.log('error', error);
    });
  }
  onClick() {
    this.isDisabled = true;
    this.incodeSDK.createSession().subscribe((session) => {
      this.processGeolocation(session.token);
      this.processFingerprint(session.token);
    });
  }
  onClickCountryValid() {
    this.stateBiometricService.updateStartBiometric(true);
    this.router.navigate(['/suggestion']);
  }
}
