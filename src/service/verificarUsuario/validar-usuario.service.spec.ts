import { TestBed } from '@angular/core/testing';

import { ValidarUsuarioService } from './validar-usuario.service';
import { HttpClientModule } from '@angular/common/http';

describe('ValidarUsuarioService', () => {
  let service: ValidarUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(ValidarUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
