import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questoes } from 'src/model/questoes/questoes';
import { Resposta } from 'src/model/questoes/resposta';

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
    return this.http.get<Questoes>(`${this.baseUrl}`,{headers:this.montaToken()});
  }

  buscarComFiltro(){}

  responder(id:number,resposta:Resposta):Observable<any>{
    return this.http.post(`${this.baseUrl}?id=${id}`,resposta,{headers: this.montaToken()});
  }

}
