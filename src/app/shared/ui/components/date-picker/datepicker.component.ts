import {
  Component,
  input,
  output,
  signal,
  computed,
  model,
  forwardRef,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'fixato-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule, SvgIconComponent],
  templateUrl: './datepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent implements ControlValueAccessor {
  date!: string | null;
  placeholder = input('Select date');
  dateChange = output<string | null>();
  selectedDisplayedDate: string | null = null;
  currentMonth = signal(new Date());
  displayDate!: string | null;
  locale = input<string>('it');
  weekdays = this.getLocalizedWeekdays();

  calendarDays = computed(() => {
    const firstDay = new Date(
      this.currentMonth().getFullYear(),
      this.currentMonth().getMonth(),
      1
    );
    const lastDay = new Date(
      this.currentMonth().getFullYear(),
      this.currentMonth().getMonth() + 1,
      0
    );

    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(
        new Date(
          this.currentMonth().getFullYear(),
          this.currentMonth().getMonth(),
          i
        )
      );
    }

    return days;
  });

  monthYear = computed(() => {
    return this.currentMonth().toLocaleString(this.locale(), {
      month: 'long',
      year: 'numeric',
    });
  });

  isOpen = signal(false);

  prevMonth() {
    this.currentMonth.update(
      (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1)
    );
  }

  nextMonth() {
    this.currentMonth.update(
      (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1)
    );
  }

  toggleCalendar(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen.update((value) => !value);
  }

  selectDate(date: Date | null) {
    if (date) {
      const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      this.date = dateString;
      this.displayDate = date.toLocaleDateString();
      this.onChange(dateString);
      this.onTouched();
      this.dateChange.emit(dateString);
      this.isOpen.set(false);
    }
  }

  isSelected(date: Date | null): boolean {
    if (!date || !this.date) return false;
    return date.toISOString().split('T')[0] === this.date;
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.date = value;
    if (value) {
      const date = new Date(value);
      this.displayDate = date.toLocaleDateString();
    } else {
      this.displayDate = null;
    }
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

  clearDate() {
    this.date = null;
    this.displayDate = null;
    this.onChange(null);
    this.onTouched();
    this.dateChange.emit(null);
  }

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      this.isOpen()
    ) {
      this.isOpen.set(false);
    }
  }

  private getLocalizedWeekdays(): string[] {
    const weekdays = [];
    const date = new Date(2023, 0, 1); // Sunday
    for (let i = 0; i < 7; i++) {
      weekdays.push(
        new Intl.DateTimeFormat(this.locale(), { weekday: 'short' }).format(
          date
        )
      );
      date.setDate(date.getDate() + 1);
    }
    return weekdays;
  }
}
