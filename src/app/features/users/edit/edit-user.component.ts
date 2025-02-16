import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersFacadeService } from '../shared/shell/users-facade.service';
import { DatepickerComponent } from '../../../shared/ui/components/date-picker/datepicker.component';
import { User } from '../models/user.model';
import { AddressComponent } from './ui/components/address/address.component';
import { DetailsUserFormComponent } from './ui/components/details-user-form/details-user-form.component';
import { EditUserFormComponent } from './ui/components/edit-user-form/edit-user-form.component';

@Component({
  selector: 'app-edit-user',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DetailsUserFormComponent,
    EditUserFormComponent,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  private fb = inject(FormBuilder);
  service = inject(UsersFacadeService);
  isEdit = signal(false);
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [0, [Validators.required, Validators.min(0)]],
    username: ['', Validators.required],
    role: ['', Validators.required],
    birthDate: ['', Validators.required],
    address: this.fb.group({
      address: [''],
      city: [''],
      state: [''],
      stateCode: [''],
      postalCode: [''],
      country: [''],
    }),
    address2: this.fb.group({
      address: [''],
      city: [''],
      state: [''],
      stateCode: [''],
      postalCode: [''],
      country: [''],
    }),
  });

  patchedForm = computed(() => {
    const item = this.service.selectedUser();
    if (item) {
      this.form.patchValue(item);
    }
    return this.form;
  });

  handleSave() {
    const formData = this.form.value as Partial<User>;
    this.service.updateUser(formData);
    this.toggleEdit();
  }
  toggleEdit() {
    this.isEdit.set(!this.isEdit());
  }
}
