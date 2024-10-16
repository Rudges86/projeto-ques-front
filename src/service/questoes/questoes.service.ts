import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Questoes } from 'src/model/questoes/questoes';
import { Resposta } from 'src/model/questoes/resposta';
import { ErrorMessage } from 'src/model/responseMensage';

@Injectable({
  providedIn: 'root'
})
export class QuestoesService {
  private baseUrl = 'http://localhost:8080/api/questoes'

  constructor(private http: HttpClient) { }

  private montaToken():HttpHeaders {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return headers;
  }


  cadastrarQuestoes() {}

  getQuestoes():Observable<Questoes>{
    return this.http.get<Questoes>(`${this.baseUrl}`,{headers:this.montaToken()}).pipe(
      catchError((erro:ErrorMessage) => {
        let erroMessage = "Erro desconhecido";
          if(erro.error) {
            erroMessage = erro.error.message;

          }
          return throwError(()=> new Error(erroMessage));
      })
    );
  }

  buscarComFiltro(){}

  responder(id:number,resposta:Resposta):Observable<any>{
    return this.http.post(`${this.baseUrl}?id=${id}`,resposta,{headers: this.montaToken()}).pipe(
      catchError((erro:ErrorMessage) => {
        let erroMessage = "Erro desconhecido";
          if(erro.error) {
            erroMessage = erro.error.message;

          }
          return throwError(()=> new Error(erroMessage));
      })
    );
  }

}
