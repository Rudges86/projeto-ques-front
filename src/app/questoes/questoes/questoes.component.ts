import { Component, OnInit } from '@angular/core';
import { Questoes } from 'src/model/questoes/questoes';
import { Resposta } from 'src/model/questoes/resposta';
import { QuestoesService } from 'src/service/questoes/questoes.service';

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

  constructor(private service: QuestoesService) { }

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
        console.log(response)
      },
      error: (erro) => {
        console.log(erro)
      }
    });
  }

}
