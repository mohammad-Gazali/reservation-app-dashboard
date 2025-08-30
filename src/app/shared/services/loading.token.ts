import { InjectionToken, signal } from "@angular/core";

export const LOADING = new InjectionToken("loading", {
  providedIn: "root",
  factory: () => signal(false),
})