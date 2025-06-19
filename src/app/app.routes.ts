import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "home",
    loadComponent: () =>
      import("./features/home/home.component").then((m) => m.HomeComponent),
    data: { preload: true },
  },
  {
    path: "invalid",
    loadComponent: () =>
      import(
        "./features/restrictions/outside-country/outside-country.component"
      ).then((m) => m.OutsideCountryComponent),
  },
  {
    path: "invalid-qr",
    loadComponent: () =>
      import("./features/restrictions/invalid-qr/invalid-qr.component").then(
        (m) => m.InvalidQrComponent
      ),
  },
  {
    path: "suggestion",
    loadChildren: () =>
      import("./features/start-biometric/start-biometric.component").then(
        (m) => m.SuggestionsCameraComponent
      ),
    data: { preload: true },
  },
  {
    path: "location",
    loadComponent: () =>
      import("./features/location/location.component").then(
        (m) => m.LocationComponent
      ),
    data: { preload: true },
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home" },
];
