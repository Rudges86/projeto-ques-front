import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestoesModule } from './questoes/questoes.module';
import { SharedModule } from './shared/material/shared.module';
import { UsuarioModule } from './usuario/usuario.module';
import { NaoAutorizadoComponent } from './handles/nao-autorizado/nao-autorizado.component';
import { NaoEncontradoComponent } from './handles/nao-encontrado/nao-encontrado.component';


@NgModule({
  declarations: [
    AppComponent,
    NaoAutorizadoComponent,
    NaoEncontradoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsuarioModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    QuestoesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
