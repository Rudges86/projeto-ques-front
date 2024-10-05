import { Component } from '@angular/core';
import { ValidarUsuarioService } from '../../service/verificarUsuario/validar-usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validar-usuario',
  templateUrl: './validar-usuario.component.html',
  styleUrls: ['./validar-usuario.component.scss']
})
export class ValidarUsuarioComponent{
  private codigo:string = "";
  public mensagem:string ="";

  constructor(private service:ValidarUsuarioService, private route:ActivatedRoute){}


  ngOnInit() {
    this.route.params.subscribe(params => this.codigo = params['id']);
    this.service.validarUsuario(this.codigo).subscribe({
      next: message => this.mensagem = message.message,
      error: erro => this.mensagem = erro.error.message
    })
    console.log(this.codigo)
  }


}
