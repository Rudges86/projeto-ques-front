import { IPageable } from "./impl/Ipageable";
import { IQuestoes } from "./impl/Iquestoes";

export class Questoes {
  content: IQuestoes[] = [];
  pageable:IPageable | undefined;

  constructor(){}
}
