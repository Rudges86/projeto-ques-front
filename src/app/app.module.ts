import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioModule } from './usuario/usuario.module';
import {HttpClientModule} from '@angular/common/http';
import { ValidarUsuarioComponent } from './validar-usuario/validar-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedModule } from './shared/material/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ValidarUsuarioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsuarioModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
