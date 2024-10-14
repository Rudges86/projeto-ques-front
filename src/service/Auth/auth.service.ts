import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ErrorMessage } from 'src/model/responseMensage';
import { UserLogin } from 'src/model/usuario/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8080/api/'
  constructor(private http: HttpClient, private router: Router) { }


  logarUsuario(user: UserLogin): Observable<string> {
     return this.http.post<{ token: string }>(`${this.baseUrl}auth/login`, user).pipe(
      map(response => response.token),
      catchError((erro:ErrorMessage) => {
        let erroMessage = "Erro desconhecido";
          if(erro.error) {
            erroMessage = erro.error.message;

          }
          return throwError(()=> new Error(erroMessage));
      })
     );
  }

  logout(): void {
    sessionStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  isAutentacted(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getRole(): string | null {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.role
    }
    return null;
  }

  validaToken(): Observable<boolean> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return new Observable<boolean>((observer) => {
        observer.next(false);
        observer.complete();
      });
    }
    return this.http.get(`${this.baseUrl}auth/valida-token`, { headers: { 'Authorization': 'Bearer ' + token } }).pipe(
      map(() => true),
      catchError(() => {
        this.logout(); // Logout se o token não for válido
        return [false];
      }));
  }

}
