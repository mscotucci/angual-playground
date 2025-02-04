import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p class="text-xl mb-8">The page you are looking for doesn't exist.</p>
      <a routerLink="/" class="btn btn-primary">Go to Home</a>
    </div>
  `,
})
export class NotFoundComponent {}
