import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQuestionConfirmationComponent } from './test-question-confirmation.component';

describe('TestQuestionConfirmationComponent', () => {
  let component: TestQuestionConfirmationComponent;
  let fixture: ComponentFixture<TestQuestionConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestQuestionConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestQuestionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
