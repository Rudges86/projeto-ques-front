import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './usuario/login/login.component';
import { CadastroComponent } from './usuario/cadastro/cadastro.component';
import { UsuarioComponent } from './usuario/perfil/usuario.component';
import { ValidarUsuarioComponent } from './usuario/validar-usuario/validar-usuario.component';
import { CadastrarQuestoesComponent } from './questoes/cadastrar-questoes/cadastrar-questoes.component';
import { AuthGuard } from './auth.guard';
import { NaoAutorizadoComponent } from './handles/nao-autorizado/nao-autorizado.component';
import { NaoEncontradoComponent } from './handles/nao-encontrado/nao-encontrado.component';
import { QuestoesComponent } from './questoes/questoes/questoes.component';


const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"", pathMatch:"full", redirectTo:"login"},
  {path:"cadastrar", component:CadastroComponent},
  {path:"validar/:id", component:ValidarUsuarioComponent},
  {path:"perfil",component:UsuarioComponent,canActivate: [AuthGuard], data: { perfil: ['ADMIN','CLIENTE'] }},
  {path:"cadastrarQuestoes",component:CadastrarQuestoesComponent,canActivate: [AuthGuard], data: { perfil: ['ADMIN'] }},
  {path:"questoes",component:QuestoesComponent},
  {path:"naoAutorizado", component:NaoAutorizadoComponent},
  {path:"**", component:NaoEncontradoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
