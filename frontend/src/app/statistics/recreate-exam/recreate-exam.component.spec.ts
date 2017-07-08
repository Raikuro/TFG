import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecreateExamComponent } from './recreate-exam.component';

describe('RecreateExamComponent', () => {
  let component: RecreateExamComponent;
  let fixture: ComponentFixture<RecreateExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecreateExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecreateExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
