import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsTeacherComponent } from './questions-teacher.component';

describe('QuestionsTeacherComponent', () => {
  let component: QuestionsTeacherComponent;
  let fixture: ComponentFixture<QuestionsTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
