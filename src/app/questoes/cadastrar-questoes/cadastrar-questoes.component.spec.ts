import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarQuestoesComponent } from './cadastrar-questoes.component';

describe('CadastrarQuestoesComponent', () => {
  let component: CadastrarQuestoesComponent;
  let fixture: ComponentFixture<CadastrarQuestoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarQuestoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
