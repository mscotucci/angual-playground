import { Component, inject, input } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  formGroupName = input.required<string>();
}
