import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondQuestionComponent } from './respond-question.component';

describe('RespondQuestionComponent', () => {
  let component: RespondQuestionComponent;
  let fixture: ComponentFixture<RespondQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
