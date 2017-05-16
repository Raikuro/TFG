import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestIndexAlumnComponent } from './test-index-alumn.component';

describe('TestIndexAlumnComponent', () => {
  let component: TestIndexAlumnComponent;
  let fixture: ComponentFixture<TestIndexAlumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestIndexAlumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestIndexAlumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
