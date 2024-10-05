import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from './../../../service/usuario/usuario.service';
import { SnackService } from 'src/service/snack/snack.service';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnDestroy {
  private timeOut: any;
  cadastrarFormulario: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha: this.fb.group({
      password: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
      ]],

      confirmaSenha: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),]]
    })
  });


  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snack: SnackService,
    private route: Router

  ) { }


  ngOnInit() {

  }


  senhasIguais(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmaSenha = control.get('confirmaSenha')?.value;

    return password === confirmaSenha ? null : { mismatch: true };
  }

  cadastrar():void {
    let dados = {
      nome: this.cadastrarFormulario.get('nome')?.value,
      email: this.cadastrarFormulario.get('email')?.value,
      password: this.cadastrarFormulario.get('senha.password')?.value,
      confirmaSenha: this.cadastrarFormulario.get('senha.confirmaSenha')?.value,
    }

    this.usuarioService.cadastrar(dados).subscribe({
      next: (sucesso) => {
        this.snack.showMessage(sucesso.message);
        this.timeOut = setTimeout(() => {
          this.route.navigate(['/login'])
        }, 16000)
      },
      error: (erro) => this.snack.showMessage(erro.error.message, true)
    });
  }


  ngOnDestroy(): void {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }
}
