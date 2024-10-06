import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResponseMensage } from 'src/model/responseMensage';
import { PerfilUsuario } from 'src/model/usuario/PerfilUsuario';
import { SnackService } from 'src/service/snack/snack.service';
import { UsuarioService } from 'src/service/usuario/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  perfil$ !: Observable<PerfilUsuario>;
  perfilUser!: PerfilUsuario;
  loading: boolean = true;
  titulo: string = "Perfil";

  imagem: File | null = null;
  imagemPreview: string | null = null;
  isEditing = false;
  //Montar o reactive depois
  perfilForm: FormGroup = this.fb.group({
    nome: [{ value: '', disabled: true }, [Validators.required]],
    email: [{ value: '', disabled: true }, [Validators.required, Validators.email]]
  });


  constructor(private fb: FormBuilder, private usuario: UsuarioService, private snackService: SnackService,) { }


  ngOnInit(): void {
    this.carregarPerfil();
  }


  carregarPerfil(): void {
    // this.perfil$ = this.usuario.perfil();

    this.usuario.perfil().subscribe({
      next: (user) => {
        this.perfilUser = user;
        this.populaForm(this.perfilUser);
        if (user.imagemPerfil) {
          this.perfilUser.imagemPerfil = this.convertBase64ToBlob(user.imagemPerfil);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error(error)
        this.loading = false;
        this.snackService.showMessage(error.message, true);
      }
    })


  }

  populaForm(perfil: PerfilUsuario) {
    this.perfilForm.get('nome')?.setValue(perfil.nome);
    this.perfilForm.get('email')?.setValue(perfil.email);
  }

  habilitarEdicao(desabilita?: boolean): void {
    this.isEditing = true;
    if(desabilita){
      this.isEditing = !desabilita;
    }
    if (this.isEditing) {
      this.titulo = "Editar perfil"
      this.perfilForm.get('nome')?.enable();
      this.perfilForm.get('email')?.enable();
    } else {
      this.titulo = "Perfil";
      this.perfilForm.get('nome')?.disable();
      this.perfilForm.get('email')?.disable();
    }
  }

  salvar() {
    this.habilitarEdicao(true);
    this.perfilUser.nome = this.perfilForm.get('nome')?.value;
    this.perfilUser.email = this.perfilForm.get('email')?.value;

    console.log(this.perfilUser)
    if(this.imagem){
      this.usuario.editarPerfil(this.perfilUser, this.imagem).subscribe({
        next:(response:ResponseMensage) => {
            this.snackService.showMessage(response.message)
        },
        error:(erro)=>console.error(erro)
      });
    } else {
      this.usuario.editarPerfil(this.perfilUser).subscribe({
        next:(response:ResponseMensage) => {
            this.snackService.showMessage(response.message)
        },
        error:(erro)=>console.error(erro)
      });
    }


  }

  convertBase64ToBlob(base64: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Defina o tipo de imagem apropriado aqui
    return URL.createObjectURL(blob);
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.imagem = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.perfilUser.imagemPerfil = reader.result as string;
      }
      reader.readAsDataURL(this.imagem);
    }

  }

}
