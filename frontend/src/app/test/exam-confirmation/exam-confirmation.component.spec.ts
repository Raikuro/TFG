import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamConfirmationComponent } from './exam-confirmation.component';

describe('ExamConfirmationComponent', () => {
  let component: ExamConfirmationComponent;
  let fixture: ComponentFixture<ExamConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
