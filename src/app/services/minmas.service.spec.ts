import { TestBed } from '@angular/core/testing';

import { MinmasService } from './minmas.service';

describe('MinmasService', () => {
  let service: MinmasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinmasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
