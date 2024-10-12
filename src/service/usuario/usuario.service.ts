import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMensage } from 'src/model/responseMensage';
import { CadastroUsuario } from 'src/model/usuario/cadastroUsuario';
import { PerfilUsuario } from 'src/model/usuario/PerfilUsuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/api/'
  constructor(private http: HttpClient) { }

  cadastrar(usuario: CadastroUsuario):Observable<ResponseMensage> {
    return this.http.post<ResponseMensage>(`${this.baseUrl}cadastrar`,usuario, {observe: 'body'})
  }

  perfil():Observable<PerfilUsuario> {
    //const token = sessionStorage.getItem("token");
    const headers:HttpHeaders = this.montaToken();

    return this.http.get<PerfilUsuario>(`${this.baseUrl}perfil`, {headers: headers});
  }

  editarPerfil(perfil:PerfilUsuario, imagem?:File):Observable<ResponseMensage> {
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
