import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUserFormComponent } from './details-user-form.component';

describe('DetailsUserFormComponent', () => {
  let component: DetailsUserFormComponent;
  let fixture: ComponentFixture<DetailsUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsUserFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
