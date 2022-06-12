import { TestBed } from '@angular/core/testing';

import { AuthentificatorService } from './authentificator.service';

describe('AuthentificatorService', () => {
  let service: AuthentificatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
