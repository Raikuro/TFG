import { TestBed, inject } from '@angular/core/testing';

import { TheoryService } from './theory.service';

describe('TheoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TheoryService]
    });
  });

  it('should ...', inject([TheoryService], (service: TheoryService) => {
    expect(service).toBeTruthy();
  }));
});
