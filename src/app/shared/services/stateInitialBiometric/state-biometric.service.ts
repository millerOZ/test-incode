import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateBiometricService {
  private readonly _startBiometric = signal<boolean>(false);

  readonly startBiometric = this._startBiometric.asReadonly();

  updateStartBiometric(value: boolean): void {
    this._startBiometric.set(value);
  }
}
