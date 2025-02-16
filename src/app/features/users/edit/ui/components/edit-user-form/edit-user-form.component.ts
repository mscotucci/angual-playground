import { Component, inject, input } from '@angular/core';
import { User } from '../../../../models/user.model';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from '../../../../../../shared/ui/components/date-picker/datepicker.component';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-edit-user-form',
  imports: [
    ReactiveFormsModule,
    DatepickerComponent,
    AddressComponent,
    DatepickerComponent,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './edit-user-form.component.html',
})
export class EditUserFormComponent {
  user = input.required<User>();
}
