import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTheoryComponent } from './search-theory.component';

describe('SearchTheoryComponent', () => {
  let component: SearchTheoryComponent;
  let fixture: ComponentFixture<SearchTheoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTheoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTheoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
