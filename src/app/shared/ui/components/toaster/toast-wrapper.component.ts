import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterService } from './toaster.service';
import { ToastComponent } from './toast.component';

@Component({
  selector: 'toaster-wrapper',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-wrapper.component.html',
})
export class ToasterWrapperComponent {
  private toastService = inject(ToasterService);
  hidden = computed(() => !this.toastService.toastMessage()?.message);
  message = computed(() => this.toastService.toastMessage()?.message);
  position = computed(() => this.toastService.toastMessage()?.position);
  type = computed(() => this.toastService.toastMessage()?.type || 'info');
  duration = computed(() =>
    setTimeout(() => {
      this.toastService.toastMessage.set(undefined);
    }, this.toastService.toastMessage()?.duration)
  );
  class = computed(() => {
    switch (this.toastService.toastMessage()?.position) {
      case 'top-left':
        return 'toast toast-top toast-start';
      case 'top-center':
        return 'toast toast-top toast-center';
      case 'top-right':
        return 'toast toast-top toast-end';
      case 'middle-left':
        return 'toast toast-middle toast-start';
      case 'middle-center':
        return 'toast toast-middle toast-center';
      case 'middle-right':
        return 'toast toast-middle toast-end';
      case 'bottom-left':
        return 'toast toast-bottom toast-start';
      case 'bottom-center':
        return 'toast toast-bottom toast-center';
      case 'bottom-right':
        return 'toast toast-bottom toast-end';
      default:
        return 'toast toast-top toast-end';
    }
  });
}
