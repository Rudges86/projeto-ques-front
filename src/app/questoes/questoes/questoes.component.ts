import { SnackService } from 'src/service/snack/snack.service';
import { Component, OnInit } from '@angular/core';
import { Questoes } from 'src/model/questoes/questoes';
import { Resposta } from 'src/model/questoes/resposta';
import { QuestoesService } from 'src/service/questoes/questoes.service';
import { ResponseMensage } from 'src/model/responseMensage';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-questoes',
  templateUrl: './questoes.component.html',
  styleUrls: ['./questoes.component.scss']
})
export class QuestoesComponent implements OnInit {
  questoes: Questoes = new Questoes();
  alternativaSelecionada: Resposta = {
    resposta: ""
  };

  constructor(private service: QuestoesService, private snack :SnackService) { }

  ngOnInit(): void {
    this.service.getQuestoes().subscribe({
      next: (questoes: Questoes) => {
        this.questoes = questoes;
      }
    })
  }

  resposta(id: number): void {
    this.service.responder(id, this.alternativaSelecionada).subscribe({
      next: (response) => {
        this.snack.showMessage(response.message);
      },
      error: (erro:ResponseMensage) => {
        if(erro.status == '401') {
          this.snack.showMessage("Faça login para responder as questões", true);
        }
        console.log(erro)
      }
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
