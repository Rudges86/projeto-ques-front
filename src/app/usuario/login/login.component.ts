import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserLogin } from 'src/model/usuario/UserLogin';
import { AuthService } from 'src/service/Auth/auth.service';
import { SnackService } from 'src/service/snack/snack.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user!: UserLogin;
  login: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackService: SnackService,
    private router: Router
  ) { }

  //Depois remover e implementar com http-only

  logar() {

    this.user = {
      email: this.login.get('email')?.value,
      password: this.login.get('password')?.value
    };

    this.authService.logarUsuario(this.user).subscribe({
      next: (token: string) => {
        sessionStorage.setItem("token", token);
        this.router.navigate(['/perfil']);
      },
      error: (erro => {
        this.snackService.showMessage(erro.message);
        console.error(erro)
      })
    });
  }

  mostrar() {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      console.log(decode)
    }


  }

}
