import { Injectable, signal } from '@angular/core';

type horizontalPosition = 'left' | 'center' | 'right';
type verticalPosition = 'top' | 'middle' | 'bottom';

export type ToastType = 'info' | 'success' | 'error' | 'warning';
export type ScreenToastPosition = `${verticalPosition}-${horizontalPosition}`;

export interface ToastMessage {
  message: string;
  type: ToastType;
  position: ScreenToastPosition;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToasterService {
  toastMessage = signal<ToastMessage | undefined>(undefined);

  public displayToast(toastData: ToastMessage) {
    const { message, type, position, duration } = toastData;
    this.toastMessage.set({
      message,
      type,
      position,
      duration: duration ?? 3000,
    });
  }
}
