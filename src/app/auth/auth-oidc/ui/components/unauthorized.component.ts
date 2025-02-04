import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-unauthorized',
  template: `
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold text-error">Unauthorized Access</h1>
          <p class="py-6">You do not have permission to access this page.</p>
          <button class="btn btn-primary" (click)="goHome()">Go to Home</button>
        </div>
      </div>
    </div>
  `,
  standalone: true,
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
