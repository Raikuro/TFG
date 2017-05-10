import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAlumnsComponent } from './questions-alumns.component';

describe('QuestionsAlumnsComponent', () => {
  let component: QuestionsAlumnsComponent;
  let fixture: ComponentFixture<QuestionsAlumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsAlumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsAlumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
