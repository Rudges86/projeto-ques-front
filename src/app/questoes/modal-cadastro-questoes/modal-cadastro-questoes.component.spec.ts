import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroQuestoesComponent } from './modal-cadastro-questoes.component';

describe('ModalCadastroQuestoesComponent', () => {
  let component: ModalCadastroQuestoesComponent;
  let fixture: ComponentFixture<ModalCadastroQuestoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroQuestoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastroQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
