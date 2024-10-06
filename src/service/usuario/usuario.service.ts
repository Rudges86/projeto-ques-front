import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseMensage } from 'src/model/responseMensage';
import { CadastroUsuario } from 'src/model/usuario/cadastroUsuario';
import { PerfilUsuario } from 'src/model/usuario/PerfilUsuario';

import { UserLogin } from 'src/model/usuario/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/api/'

  cadastrar(usuario: CadastroUsuario):Observable<ResponseMensage> {
    return this.http.post<ResponseMensage>(`${this.baseUrl}cadastrar`,usuario, {observe: 'body'})
  }

  perfil():Observable<PerfilUsuario> {
    //const token = sessionStorage.getItem("token");
    const headers:HttpHeaders = this.montaToken();

    return this.http.get<PerfilUsuario>(`${this.baseUrl}perfil`, {headers: headers});
  }

  logarUsuario(user:UserLogin):Observable<string>{
    return this.http.post<{token:string}>(`${this.baseUrl}login`,user).pipe(
      map(response => response.token)
    );
  }

  editarPerfil(perfil:PerfilUsuario, imagem?:File):Observable<ResponseMensage> {
    debugger
    const formData = new FormData();
    if(imagem){
      formData.append('imagem',imagem);
    }
    formData.append('nome',perfil.nome);
    formData.append('email',perfil.email);
    const headers:HttpHeaders = this.montaToken();
    return this.http.patch<ResponseMensage>(`${this.baseUrl}editarPerfil`,formData,{headers: headers})
  }



  private montaToken():HttpHeaders {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return headers;
  }
}
