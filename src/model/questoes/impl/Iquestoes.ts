import { IBanca } from "./Ibanca";
import { IDisciplina } from "./Idisciplina";
export interface IQuestoes {
  id: number;
  texto: string;
  pergunta: string;
  alternativas: string[]
  disciplina: IDisciplina;
  banca: IBanca;
}
