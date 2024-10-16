import { AfterViewInit, Component, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalCadastroQuestoesComponent } from '../modal-cadastro-questoes/modal-cadastro-questoes.component';
import { Banca } from 'src/model/questoes/banca';

@Component({
  selector: 'app-cadastrar-questoes',
  templateUrl: './cadastrar-questoes.component.html',
  styleUrls: ['./cadastrar-questoes.component.scss']
})
export class CadastrarQuestoesComponent {
  lista: Banca[] = [
    { nome: 'Cebraspe', selecionada: false },
    { nome: "FGV", selecionada: false },
    { nome: "IBFC", selecionada: false }];
  valor: string = "";
  filtro: Banca[] = this.lista;
  selecionados: Banca[] = [];
  isClick: boolean = false;
  textoSelecionado: string = "";
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCadastroQuestoesComponent, {
      width: '500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Fechou")
    })
  }
  teste() {
    console.log(this.valor)
  }

  filtroBanca() {
    this.filtro = this.lista.filter(
      (item) => {
        return item.nome.toLocaleLowerCase().includes(this.valor.toLocaleLowerCase().trim());
      });
    console.log(this.filtro)
  }

  seleciona(option: Banca) {
    if (this.selecionados.length === 0) {
      this.textoSelecionado = "";
    }

    console.log(this.selecionados)
    if (!option.selecionada) {
      option.selecionada = true;
      this.selecionados.push(option);
      this.textoSelecionado =
        this.selecionados.length > 1 ?
          `${this.selecionados.length} selecionadas` : `${this.selecionados.length} selecionada`;
    } else {
      option.selecionada = false;
      this.selecionados.splice(this.selecionados.indexOf(option), 1);
    }
  }

  habilitaLista() {
    this.isClick = !this.isClick;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.banca-check');

    if (!clickedInside) {
      this.isClick = false;
    }
  }
}
