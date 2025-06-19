import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { create } from '@incodetech/welcome';
import es from '../../../assets/i18n/incode.translations';

@Injectable({
  providedIn: 'root',
})
export class IncodeService {
  private readonly apiKey = '017d61399b6b26f5ead65041e67005bd55e1feb1';
  private readonly configurationId = '66a00a3e155763e465f40a94';
  private readonly apiURL = 'https://demo-api.incodesmile.com';
  public incode: any;
  public X_Incode_Hardware_Id = '';

  constructor() {
    this.incode = create({
      apiURL: this.apiURL,
      lang: 'es',
      apiKey: this.apiKey,
      translations: es,
    });
  }
  
  createSession(): Observable<any> {
    const getSession = async (): Promise<any> => {
      try {
        const response = await fetch(`${this.apiURL}/omni/start`, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-api-key': this.apiKey,
            'api-version': '1.0',
          },
          body: JSON.stringify({
            configurationId: this.configurationId,
            countryCode: 'ALL',
            externalCustomer: 'testFrontend',
          }),
        });

        if (!response.ok) {
          throw new Error('Token request failed');
        }

        return await response.json();
      } catch (error) {
        console.error('generateToken error:', error);
        return undefined;
      }
    };
    return from(getSession());
  }
  // For enterprise deployments please start session within your own web service
  completeSession(uuid?: string): Observable<any> {
    const baseUrl: string = window.location.hostname || 'localhost';

    const fetchCompleteSession = (): Promise<any> => {
      let url;
      url = `https://${baseUrl}:443/complete?uniqueId=${uuid}`;

      return new Promise((resolve) => {
        const response = fetch(url, {
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-version': '1.0',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer',
        });
        resolve(response);
      });
    };
    return from(fetchCompleteSession());
  }
}
