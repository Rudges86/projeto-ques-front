import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestoesService {
  private baseUrl = 'http://localhost:8080/api/'

  constructor(private http: HttpClient) { }

  private montaToken():HttpHeaders {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return headers;
  }
}
