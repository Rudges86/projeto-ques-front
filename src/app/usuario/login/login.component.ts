import { UsuarioService } from './../../../service/usuario/usuario.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/model/usuario/UserLogin';
import { jwtDecode } from 'jwt-decode';
import { SnackService } from 'src/service/snack/snack.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    user!: UserLogin;
    login: FormGroup = this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
    constructor(private fb: FormBuilder,
      private usuarioService:UsuarioService,
      private snackService: SnackService,
      private router: Router
    ){}

//Depois remover e implementar com http-only

    logar() {

       this.user = {
        email: this.login.get('email')?.value,
        password: this.login.get('password')?.value
       };

       this.usuarioService.logarUsuario(this.user).subscribe({
        next: (token =>{
            sessionStorage.setItem("token", token);
            this.router.navigate(['/usuario']);

          }),
        error: (erro =>{
          this.snackService.showMessage(erro.message);
            console.error(erro)
          })
       });

       console.log(sessionStorage.getItem("token"));
    }

    mostrar(){
      const token = sessionStorage.getItem("token");
      if(token) {
        const decode = jwtDecode(token);
        console.log(decode)
      }


    }

}
