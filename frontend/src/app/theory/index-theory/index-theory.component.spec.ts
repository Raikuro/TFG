import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTheoryComponent } from './index-theory.component';

describe('IndexTheoryComponent', () => {
  let component: IndexTheoryComponent;
  let fixture: ComponentFixture<IndexTheoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexTheoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexTheoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
