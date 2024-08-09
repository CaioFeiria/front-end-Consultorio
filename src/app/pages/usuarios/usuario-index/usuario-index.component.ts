import { Component } from '@angular/core';
import { Usuario } from '../../../models/model.usuario';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-index',
  templateUrl: './usuario-index.component.html',
  styleUrl: './usuario-index.component.css'
})
export class UsuarioIndexComponent {

  Usuarios:Usuario[];
  id:number | null;
  nome:string;

  constructor(private usuarioServices:UsuariosService, private dialog:MatDialog){
    this.Usuarios = [];
    this.id = null,
    this.nome = '';
  }

  definirPesquisa(): void{
    this.Usuarios = [];

    if(this.id != null){
      this.pesquisarPorId();
      return;
    }

    //this.nome == this.nome != ''
    if(this.nome){
      this.pesquisarPorNome();
      return;
    }

    this.listar();
  }

  listar(): void{
    this.usuarioServices.getAll().subscribe({
      next: (json:Usuario[]) => {
        this.Usuarios = json;
      },
      error: (json:any) => {
        this.exibirMensagemErro(json.status);
      }
    })
  }

  pesquisarPorId(): void{
    this.usuarioServices.getById(Number(this.id)).subscribe({
      next: (json:Usuario) => {
        this.Usuarios = [json];
      },
      error: (json:any) => {
        this.exibirMensagemErro(json.status);
      }
    })
  }

  pesquisarPorNome(): void{
    this.usuarioServices.getByName(this.nome).subscribe({
      next: (json:Usuario[]) => {
        this.Usuarios = json;
      },
      error: (json:any) => {
        this.exibirMensagemErro(json.status);
      }
    })
  }

  exibirMensagemErro(status:number): void{
    if (status === 404)
      this.exibirMensagem('Nenhum paciente encontrado')
    else if (status === 500)
      this.exibirMensagem('Erro interno do servidor')
    else if (status === 0)
      this.exibirMensagem('Falha na requisição\nEntre em contato com o suporte.')
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, 
      {data:{mensagem:msg}});
  }
}
