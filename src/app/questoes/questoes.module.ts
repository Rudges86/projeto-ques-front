import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestoesComponent } from './questoes/questoes.component';
import { SharedModule } from '../shared/material/shared.module';
import { CadastrarQuestoesComponent } from './cadastrar-questoes/cadastrar-questoes.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ModalCadastroQuestoesComponent } from './modal-cadastro-questoes/modal-cadastro-questoes.component';



@NgModule({
  declarations: [
    QuestoesComponent,
    CadastrarQuestoesComponent,
    ModalCadastroQuestoesComponent
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
    QuestoesComponent,
    CadastrarQuestoesComponent
  ]
})
export class QuestoesModule { }
