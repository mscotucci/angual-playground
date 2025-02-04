import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastType } from './toaster.service';

@Component({
  selector: 'toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  message = input<string>();
  type = input<ToastType>('info');
  duration = input<number>(3000);
}
