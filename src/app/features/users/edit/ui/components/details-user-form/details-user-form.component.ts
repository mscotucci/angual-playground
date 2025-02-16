import { Component, input } from '@angular/core';
import { User } from '../../../../models/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details-user-form',
  imports: [DatePipe],
  templateUrl: './details-user-form.component.html',
})
export class DetailsUserFormComponent {
  user = input.required<User>();
}
