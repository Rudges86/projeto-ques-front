import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cadastro-questoes',
  templateUrl: './modal-cadastro-questoes.component.html',
  styleUrls: ['./modal-cadastro-questoes.component.scss']
})
export class ModalCadastroQuestoesComponent {
  banca: string = "";
  constructor(public matDialog: MatDialogRef<ModalCadastroQuestoesComponent>) {

  }


  cadastrar(): void {
    console.log("Fechou " + this.banca);
    this.matDialog.close();
  }

  onNoClick(): void {
    this.matDialog.close();
  }

}
