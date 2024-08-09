import { Component } from '@angular/core';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../models/model.usuario';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrl: './usuario-create.component.css'
})
export class UsuarioCreateComponent {

  Usuario:Usuario;
  CSenha:string;

  constructor(private usuariosServices:UsuariosService, private router:Router, private dialog:MatDialog){
    this.Usuario = new Usuario();
    this.CSenha = '';
  }

  enviar(): void{
    if(this.validarDados()){
      this.usuariosServices.post(this.Usuario).subscribe({
        next: () => {
          this.exibirMensagemRedirecionar(`Usuario ${this.Usuario.Nome} cadastrado com sucesso.`);
        },
        error: (json:any) => {
          this.exibirMensagemErro(json.status);
        }
      })
    }
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

    if(!this.Usuario.Nome)
      msg += 'Nome;\n';

    if(!this.Usuario.Email)
      msg += 'Email;\n';

    if(!this.Usuario.Senha)
      msg += 'Senha;\n';

    if(!this.CSenha)
      msg += 'Confirmar Senha;\n';
    else if(this.Usuario.Senha !== this.CSenha)
      msg += 'Senhas não conferem;\n';

    if(msg){
      msg = 'Verifique os seguintes campos:\n'+msg;
      this.exibirMensagem(msg);
      return false;
    }
    return true;
  }
}
