import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerificationComponent } from './modal-verification.component';

describe('ModalVerificationComponent', () => {
  let component: ModalVerificationComponent;
  let fixture: ComponentFixture<ModalVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
