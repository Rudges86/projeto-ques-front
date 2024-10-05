import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './usuario/login/login.component';
import { CadastroComponent } from './usuario/cadastro/cadastro.component';
import { ValidarUsuarioComponent } from './validar-usuario/validar-usuario.component';
import { UsuarioComponent } from './usuario/perfil/usuario.component';


const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"", pathMatch:"full", redirectTo:"login"},
  {path:"cadastrar", component:CadastroComponent},
  {path:"validar/:id", component:ValidarUsuarioComponent},
  {path:"usuario",component:UsuarioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
