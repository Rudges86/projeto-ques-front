import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/service/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const perfil = route.data['perfil'];
    return this.authService.validaToken().pipe(
      map((isValido) => {
        if(!isValido) {
          this.router.navigate(['/login']);
          return false;
        }

        const role = this.authService.getRole();
        if(this.authService.isAutentacted() && perfil.includes(role)) {
          return true;
        } else {
          this.router.navigate(['/naoAutorizado']);
          return false;
        }
      })
    );
  }

}
