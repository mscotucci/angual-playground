import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconRegistryService } from './svg-icon-registry.service';

@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.viewBox]="viewBox()"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      [class]="class()"
    >
      <path [attr.d]="path()"></path>
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class SvgIconComponent {
  name = input.required<string>();
  size = input('24');
  viewBox = input('0 0 24 24');
  class = input('');

  private iconRegistry = inject(IconRegistryService);
  path = signal('');

  ngOnInit() {
    this.iconRegistry
      .getIcon(this.name())
      .subscribe((path) => this.path.set(path));
  }
}
