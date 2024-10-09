import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarUsuarioComponent } from './validar-usuario.component';
import { UsuarioModule } from '../usuario.module';

describe('ValidarUsuarioComponent', () => {
  let component: ValidarUsuarioComponent;
  let fixture: ComponentFixture<ValidarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarUsuarioComponent ],
      imports:[UsuarioModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
