import { TestBed } from '@angular/core/testing';

import { SnackService } from './snack.service';
import { SharedModule } from 'src/app/shared/material/shared.module';

describe('SnackService', () => {
  let service: SnackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[SharedModule]
    });
    service = TestBed.inject(SnackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
