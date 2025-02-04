import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth-entry',
  standalone: true,
  imports: [CommonModule],
  template: ` <h2>Welcome</h2> `,
  styles: [
    `
      :host {
        display: block;
        padding: 20px;
        text-align: center;
      }
      button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
      }
    `,
  ],
})
export class HomeComponent {}
