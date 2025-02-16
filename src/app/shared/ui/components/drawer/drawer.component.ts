import { Component, input, model, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type DrawerPosition = 'left' | 'right';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="drawer"
      [class.drawer-end]="position() === 'right'"
      [class.drawer-open]="isOpen()"
    >
      <input
        id="drawer"
        type="checkbox"
        class="drawer-toggle"
        [checked]="isOpen()"
      />
      <div class="drawer-content min-h-screen">
        <ng-content select="[drawerContent]"></ng-content>
      </div>
      <div class="drawer-side">
        <label for="drawer" class="drawer-overlay"></label>
        <div>
          <button
            class="btn btn-sm btn-ghost btn-circle absolute right-5 top-5"
            (click)="closeDrawer()"
          >
            ✕
          </button>
          <ng-content select="[drawerSide]"></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class DrawerComponent {
  isOpen = input.required<boolean>();
  position = input<DrawerPosition>('right');

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() beforeClose = new EventEmitter<void>();

  closeDrawer() {
    this.beforeClose.emit();
    this.isOpenChange.emit(false);
  }
}
