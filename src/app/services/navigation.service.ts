import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()
export class NavigationService {
  constructor(private router: Router) {
  }

  toGame(): void {
    this.router.navigate(['game']);
  }
}