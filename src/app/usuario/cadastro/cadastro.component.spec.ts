import { SnackService } from './../../../service/snack/snack.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroComponent } from './cadastro.component';
import { UsuarioModule } from '../usuario.module';
import { UsuarioService } from 'src/service/usuario/usuario.service';
import { Router } from '@angular/router';
import { CadastroUsuario } from 'src/model/usuario/cadastroUsuario';
import { FormControl, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';


describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>; //Forma de mocarr
  let snackService: jasmine.SpyObj<SnackService>;
  let cadastroService: jasmine.SpyObj<UsuarioService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', ['cadastrar']); //Forma de mocar
    const snackServicesSpy = jasmine.createSpyObj('SnackService', ['showMessage']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [CadastroComponent],
      imports: [UsuarioModule],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceSpy },
        { provide: SnackService, useValue: snackServicesSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    cadastroService = TestBed.inject(UsuarioService) as jasmine.SpyObj<UsuarioService>; //Forma de injetar
    snackService = TestBed.inject(SnackService) as jasmine.SpyObj<SnackService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve validar o preenchimento dos campos', () => {
    expect(component.cadastrarFormulario.valid).toBeFalsy();
    component.cadastrarFormulario.get('nome')?.setValue('');
    component.cadastrarFormulario.get('email')?.setValue('');
    expect(component.cadastrarFormulario.valid).toBeFalsy();
  });

  it('Deve validar senhas iguais', () => {
    const control = new FormGroup({
      password: new FormControl('123456'),
      confirmaSenha: new FormControl('654321')
    })

    const result = component.senhasIguais(control);
    expect(result).toEqual({ mismatch: true });

  })

  it('Deve chamar o serviço de cadastrar', () => {
    const mockResponse = { message: "Cadastro realizado com sucesso!" };
    cadastroService.cadastrar.and.returnValue(of(mockResponse));
    component.cadastrarFormulario.get('nome')?.setValue('Teste');
    component.cadastrarFormulario.get('email')?.setValue('teste@teste.com');
    component.cadastrarFormulario.get('senha.password')?.setValue('123456');
    component.cadastrarFormulario.get('senha.confirmaSenha')?.setValue('123456');

    component.cadastrar();

    expect(cadastroService.cadastrar).toHaveBeenCalledWith(jasmine.any(Object));
    expect(snackService.showMessage).toHaveBeenCalledWith(mockResponse.message);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);


  });

  it('Deve chamar o snackService em caso de erro', ()=> {
    const mockError = {error:{message:"Erro ao cadastrar!!"}};
    cadastroService.cadastrar.and.returnValue(throwError(mockError));

    component.cadastrar();

    expect(snackService.showMessage).toHaveBeenCalledWith(mockError.error.message, true);
  })

});
