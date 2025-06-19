import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StateBiometricService } from '../../shared/services/stateInitialBiometric/state-biometric.service';
import { IncodeService } from '../auth/incode.service';
import { FrontIdComponent } from './front-back/front-back.component';
import { SelfieComponent } from './selfie/selfie.component';

@Component({
  selector: 'app-suggestions-camera',
  standalone: true,
  imports: [CommonModule, FrontIdComponent, SelfieComponent],
  templateUrl: './start-biometric.component.html',
  styleUrl: './start-biometric.component.scss',
})
export class SuggestionsCameraComponent implements OnInit, AfterViewInit, OnDestroy {
  isCameraIntroVisible: boolean = false; // antes isValidRendering
  isGeolocationValid: boolean = false; // antes isValidGeolocation
  step: number = 0;
  session: any = null;
  isDesktop: boolean = true;
  subscription!: Subscription;
  public incodeSDK = inject(IncodeService);
  private readonly router = inject(Router);
  private readonly stateBiometricService = inject(StateBiometricService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const effectRef = effect(() => {
      console.log('Signal changed:', this.stateBiometricService.startBiometric());
      if (this.stateBiometricService.startBiometric()) {
        this.isCameraIntroVisible = true;
        console.log('Camera intro visibility toggled:', this.isCameraIntroVisible);
      }
    });

    this.destroyRef.onDestroy(() => {
      effectRef.destroy();
    });
  }

  ngOnInit(): void {
    this.isDesktop = this.incodeSDK.incode.isDesktop();
  }

  ngAfterViewInit(): void {
    if (!this.isDesktop) {
      this.subscription = this.incodeSDK.createSession().subscribe((data) => {
        this.session = data;
        console.log('SUGESTIONS_CameraComponent initialized', this.session);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onStepEvent(e: any) {
    console.log('StepEvent changed: ' + this.step);
    // If the step count indicates all modules have completed then route back to the home screen by setting session to null
    if (this.step === 2) {
      this.incodeSDK.completeSession(this.session.uniqueId);
      //this.session = null;
    }
    // If the document is classified as a Front ID only document (like a passport), then skip the back camera step
    if (e === 'selfie') {
      this.step = this.step + 2;
    
      console.log('Skipping to selfie step, current step:', this.step);
    }
    // Since the there are only 4 steps, Front, Back, Selfie and Finish return wthout incrementing
    if (this.step < 3) {
      this.step++;
      return;
    }
  }

  onClick() {
    console.log('Camera intro visibility toggled:', this.isCameraIntroVisible);
    if (!this.isDesktop) {
      this.router.navigate(['/location']);
    }
  }
}
