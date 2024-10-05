import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/material/shared.module';
import { UsuarioComponent } from './perfil/usuario.component';



@NgModule({
  declarations: [
    UsuarioComponent,
    LoginComponent,
    CadastroComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    UsuarioComponent
  ]
})
export class UsuarioModule { }
