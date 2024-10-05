import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMensage } from 'src/model/responseMensage';


@Injectable({
  providedIn: 'root'
})
export class ValidarUsuarioService {
  private urlBase:string = "http://localhost:8080/api/validar/";
  constructor(private http: HttpClient) { }

  validarUsuario(codigo:string):Observable<ResponseMensage>{
    return this.http.get<ResponseMensage>(this.urlBase+codigo);
  }
}
