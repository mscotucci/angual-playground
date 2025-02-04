import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatepickerComponent } from '../../../ui/components/date-picker/datepicker.component';
import { UsersFacadeService } from '../shared/shell/users-facade.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule, ReactiveFormsModule, DatepickerComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  private fb = inject(FormBuilder);
  service = inject(UsersFacadeService);
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [0, [Validators.required, Validators.min(0)]],
    username: ['', Validators.required],
    role: ['', Validators.required],
    birthDate: ['', Validators.required],
    // Add more form controls as needed
  });

  patchedForm = computed(() => {
    const item = this.service.selectedUser();
    if (item) {
      this.form.patchValue(item);
    }
    return this.form;
  });
}
