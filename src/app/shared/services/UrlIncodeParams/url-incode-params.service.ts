import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UrlIncodeParamsService {
  constructor(private readonly route: ActivatedRoute) {}

  getAllParams(): any {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe((params) => {
        resolve(params);
      });
    });
  }
  getParam(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.route.queryParams.subscribe((params) => {
        if (params[key]) {
          resolve(params[key] ?? null);
        }
      });
    });
  }
}
