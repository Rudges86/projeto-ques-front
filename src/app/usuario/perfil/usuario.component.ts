
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PerfilUsuario } from 'src/model/usuario/PerfilUsuario';
import { SnackService } from 'src/service/snack/snack.service';
import { UsuarioService } from 'src/service/usuario/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit{
  perfil$ !:Observable<PerfilUsuario>;
  perfilUser!: PerfilUsuario;
  loading:boolean = true;

  imagem: File | null = null;
  imagemPreview: string | null = null;
  isEditing = false;
  mensagem: string | null = null;

  constructor(private usuario: UsuarioService, private snackService: SnackService,) {}



  ngOnInit(): void {
    this.carregarPerfil();
  }


  carregarPerfil():void{
    // this.perfil$ = this.usuario.perfil();

    this.usuario.perfil().subscribe({
      next:(user) => {
        this.perfilUser = user;
        if(user.imagemPerfil){
          this.perfilUser.imagemPerfil = this.convertBase64ToBlob(user.imagemPerfil);
          this.imagemPreview = this.perfilUser.imagemPerfil;
        }
        this.loading = false;
      },
      error:(error) => {
        console.error(error)
        this.loading = false;
        this.snackService.showMessage(error.message, true);
      }
    })


  }


  enableEditing() {
    this.isEditing = true;
  }

  convertBase64ToBlob(base64: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Defina o tipo de imagem apropriado aqui
    console.log(URL.createObjectURL(blob))
    return URL.createObjectURL(blob);
  }

  onFileChange(event: any) {
    this.perfilUser.imagemPerfil = event.target.files[0];
  }
  habilitarEdicao(){

  }
}
