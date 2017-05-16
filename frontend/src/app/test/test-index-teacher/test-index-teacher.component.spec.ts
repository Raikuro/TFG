import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestIndexTeacherComponent } from './test-index-teacher.component';

describe('TestIndexTeacherComponent', () => {
  let component: TestIndexTeacherComponent;
  let fixture: ComponentFixture<TestIndexTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestIndexTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestIndexTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
