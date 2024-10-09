import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { UserLogin } from 'src/model/usuario/UserLogin';
import { AuthService } from 'src/service/Auth/auth.service';
import { SnackService } from 'src/service/snack/snack.service';
import { Router } from '@angular/router';
import { UsuarioModule } from '../usuario.module';
//crie os mocks dos serviços
class MockAuthService {
  logarUsuario(usuario: UserLogin) {
    return of('fake-token'); // Simulando uma resposta de login
  }
}

class MockSnackService {
  showMessage(message: string) {
    console.log(message); // Simulando a exibição da mensagem
  }
}

class MockRouter {
  navigate(path: string[]) { }
}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  //chame os serviços usados
  let authService: AuthService;
  let snackService: SnackService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioModule],
      declarations: [LoginComponent],
      //Adicione os imports necessários e os serviços

      //adicione os serviços e indique que ele vai usar o mock no lugar
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: SnackService, useClass: MockSnackService }
      ]
    }).compileComponents();
    //Injete cada serviço
    authService = TestBed.inject(AuthService);
    snackService = TestBed.inject(SnackService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar o formulário com campos vazios', () => {
    expect(component.login.valid).toBeFalsy();
  });

  it('Deve validar o campo de e-mail', () => {
    const email = component.login.controls['email'];
    email.setValue('');
    expect(email.valid).toBeFalsy();
    email.setValue('teste@email.com');
    expect(email.valid).toBeTrue();

  });

  it('Deve verificar se foi logado com sucesso', () => {
    spyOn(router, 'navigate'); //Método para espiar se foi navegado

    component.login.controls['email'].setValue('teste@gmail.com');
    component.login.controls['password'].setValue('password');
    component.logar();

    expect(sessionStorage.getItem('token')).toBe('fake-token');
    expect(router.navigate).toHaveBeenCalledWith(['/perfil']);

  });

  it('Deve verificar erro ao logar', () => {
    const erroResponse = {message:'Usuário ou senha inválido'};
    spyOn(authService,'logarUsuario').and.returnValue(throwError(()=> erroResponse)); //Espionar se foi chamado e quando chamar lançar o erro
    spyOn(snackService,'showMessage');

    component.login.controls['email'].setValue('teste@gmail.com');
    component.login.controls['password'].setValue('password');
    component.logar();

    expect(snackService.showMessage).toHaveBeenCalledWith(erroResponse.message);
  });
});
