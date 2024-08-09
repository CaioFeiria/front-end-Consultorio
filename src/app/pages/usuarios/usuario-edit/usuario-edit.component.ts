import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../models/model.usuario';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrl: './usuario-edit.component.css'
})
export class UsuarioEditComponent {

  Usuario:Usuario;

  constructor(private activatedRoute:ActivatedRoute, private usuariosServices:UsuariosService, 
    private router:Router, private dialog:MatDialog)
    {
    let id:string | null = this.activatedRoute.snapshot.paramMap.get('id');
    this.Usuario = new Usuario();

    this.usuariosServices.getById(Number(id)).subscribe({
      next: (json:Usuario) => {
        this.Usuario = json;
      }
    })
  }

  atualizar(): void{
    if(this.validarDados()){
      this.usuariosServices.put(this.Usuario).subscribe({
        next: () => {
          this.exibirMensagemRedirecionar(`Usuario ${this.Usuario.Nome} alterado com sucesso.`);
        },
        error: (json:any) => {
          this.exibirMensagemErro(json.status);
        }
      })
    }
  }

  desejaExcluir(): void{
    const dialogRef = this.dialog.open(ConfirmComponent, 
      {data:{mensagem:`Deseja excluir o usuario ${this.Usuario.Nome}?`}});

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result){
        this.usuariosServices.delete(this.Usuario.Id).subscribe({
          next: () => {
            this.exibirMensagemRedirecionar(`Usuario ${this.Usuario.Nome} excluído com sucesso`);
          },
          error: (jsonErro: any) => {
            this.exibirMensagemErro(jsonErro.status);
          }            
        }); 
      }
    });
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

  exibirMensagemRedirecionar(msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent, 
      {data:{mensagem:msg}});

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/usuarios']);
    });
  }

  validarDados(): boolean{
    let msg: string = '';

    if(this.Usuario.Nome === '')
      msg += 'Nome;\n';

    if(this.Usuario.Email === '')
      msg += 'Email;\n';

    if(msg){
      msg = 'Verifique os seguintes dados:\n'+msg;
      this.exibirMensagem(msg);
      return false;
    }
    return true;
  }
}
