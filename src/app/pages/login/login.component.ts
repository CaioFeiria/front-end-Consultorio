import { Component } from '@angular/core';
import { Login } from '../../models/model.login';
import { AutenticacoesService } from '../../services/autenticacoes/autenticacoes.service';
import { AlertComponent } from '../../shared/dialogs/alert/alert.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  Login: Login;

  constructor(private autenticacoesServices: AutenticacoesService, private router: Router, private dialog: MatDialog) {
    this.Login = new Login();
  }

  enviar(): void {
    if (this.validarDados()){
      this.autenticacoesServices.autenticar(this.Login).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (json: any) => {
          this.exibirMensagemErro(json.status);
          this.router.navigate(['']);
        }
      })
    }
  }

  validarDados(): boolean {
    let msg: string = '';

    if (this.Login.Email === '')
      msg += 'Email;\n';

    if (this.Login.Senha === '')
      msg += 'Senha;\n';

    if (msg) {
      msg = 'Verifique os seguintes campos:\n' + msg;
      this.exibirMensagem(msg);
      return false;
    }
    return true;
  }

  exibirMensagemErro(status: number): void {
    if (status === 400)
      this.exibirMensagem('Verifique os campos.');
    else if (status === 404)
      this.exibirMensagem('Email ou senha inválidos');
    else if (status === 500)
      this.exibirMensagem('Erro interno do servidor');
    else if (status === 0)
      this.exibirMensagem('Falha na requisição\nEntre em contato com o suporte.');
  }

  exibirMensagem(msg: string): void {
    const dialogRef = this.dialog.open(AlertComponent,
      { data: { mensagem: msg } });
  }
}
