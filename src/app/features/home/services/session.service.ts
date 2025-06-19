import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { ConfigResponse } from "../../../../core/models/session/response.mode";

@Injectable({
  providedIn: "root",
})
export class MockSessionService {
  constructor() {}
  //incode/validateSessionIncode/IdSessionIncode

  validateSessionIncode(): Observable<ConfigResponse> {
    const mockResponse: ConfigResponse = {
      activeQr: true,
      activeIncode: true,
    };
    // Simula delay de red (opcional)
    return of(mockResponse).pipe(delay(500));
  }
  
  //incode/validateSessionQr/{idSessionQr}
}
