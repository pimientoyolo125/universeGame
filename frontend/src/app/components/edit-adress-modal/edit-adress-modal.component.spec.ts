import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdressModalComponent } from './edit-adress-modal.component';

describe('EditAdressModalComponent', () => {
  let component: EditAdressModalComponent;
  let fixture: ComponentFixture<EditAdressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdressModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
