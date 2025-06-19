import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import {
  PreloadAllModules,
  provideRouter,
  withHashLocation,
  withPreloading,
} from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      routes,
      withHashLocation(),
      withPreloading(PreloadAllModules)
    ),
  ],
};
