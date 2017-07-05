import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionConfirmationComponent } from './question-confirmation.component';

describe('QuestionConfirmationComponent', () => {
  let component: QuestionConfirmationComponent;
  let fixture: ComponentFixture<QuestionConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
