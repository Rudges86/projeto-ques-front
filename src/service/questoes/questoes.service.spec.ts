import { TestBed } from '@angular/core/testing';

import { QuestoesService } from './questoes.service';
import { HttpClientModule } from '@angular/common/http';

describe('QuestoesService', () => {
  let service: QuestoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(QuestoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
