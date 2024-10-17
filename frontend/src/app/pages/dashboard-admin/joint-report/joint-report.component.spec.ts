import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointReportComponent } from './joint-report.component';

describe('JointReportComponent', () => {
  let component: JointReportComponent;
  let fixture: ComponentFixture<JointReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JointReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JointReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
