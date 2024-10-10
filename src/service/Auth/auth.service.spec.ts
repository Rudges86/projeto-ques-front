import { UserLogin } from './../../model/usuario/UserLogin';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';


class MockRouter {
  navigate(path:string[]){};
}

describe('AuthService', () => {
  let service: AuthService;
  let reqHttp: HttpTestingController;
  let route: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AuthService]
    });
    service = TestBed.inject(AuthService);
    reqHttp = TestBed.inject(HttpTestingController);
    route = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve chamar o login do usuário',() => {
    const mockResponse = {token:'fake'};
    const mockUser:UserLogin = {email:"teste@gmail.com",password:'123456'};
    //mocando a chamada do serviço
    service.logarUsuario(mockUser).subscribe(token => {
      expect(token).toEqual('fake');
    })

  //mocando a requisição o método e o retorno
  const req = reqHttp.expectOne(`${service['baseUrl']}auth/login`);
  expect(req.request.method).toBe('POST');
  req.flush(mockResponse);

  });


  it('Deve verificar se foi deslogado e redirecionado para a tela de login',()=>{
    spyOn(route, 'navigate');

    service.logout();

    expect(sessionStorage.getItem('token')).toBeNull();
    expect(route.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('Deve validar o token e retornar true',()=>{
    sessionStorage.setItem('token','token-valido');
    service.validaToken().subscribe(isValid => {
      expect(isValid).toBeTrue();
    });

    const req = reqHttp.expectOne(`${service['baseUrl']}auth/valida-token`);
    req.flush({});
  })

  it('Deve retornar true para token presente na sessão', ()=>{
    sessionStorage.setItem('token','token');
    expect(service.isAutentacted()).toBeTrue();
  })

  it('Deve retornar false se não tiver token presente na sessão', ()=> {
    sessionStorage.clear();
    expect(service.isAutentacted()).toBeFalse();
  })
});
