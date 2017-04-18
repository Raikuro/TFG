import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoryEditorComponent } from './theory-editor.component';

describe('TheoryEditorComponent', () => {
  let component: TheoryEditorComponent;
  let fixture: ComponentFixture<TheoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
