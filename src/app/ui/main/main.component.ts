import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main>
      <ng-content></ng-content>
    </main>
  `,
  styles: [],
})
export class MainComponent {}
