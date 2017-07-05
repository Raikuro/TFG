import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnrespondedQuestionListComponent } from './unresponded-question-list.component';

describe('UnrespondedQuestionListComponent', () => {
  let component: UnrespondedQuestionListComponent;
  let fixture: ComponentFixture<UnrespondedQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnrespondedQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnrespondedQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
