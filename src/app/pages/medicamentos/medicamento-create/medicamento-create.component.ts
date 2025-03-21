import { Component } from '@angular/core';
import { Medicamento } from '../../../models/model.medicamento';
import { MedicamentosService } from '../../../services/medicamentos/medicamentos.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-medicamento-create',
  templateUrl: './medicamento-create.component.html',
  styleUrl: './medicamento-create.component.css'
})
export class MedicamentoCreateComponent {

  Medicamento: Medicamento;

  constructor(private medicamentosService:MedicamentosService,
              private router: Router,
              private dialog:MatDialog){
    this.Medicamento = new Medicamento();
  }

  enviar(): void{
    if (this.validarDadosExibirMensagem()){
      this.medicamentosService.post(this.Medicamento).subscribe({
        next: () => {
          this.exibirMensagemRedirecionar('Medicamento incluído com sucesso');
        },
        error: (jsonErro: any) => {
          this.exibirMensagemErro(jsonErro.status);
        }
      });
    }
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, 
      {data:{mensagem:msg}});
  }

  exibirMensagemRedirecionar(msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent, 
      {data:{mensagem:msg}});

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/medicamentos']);
    });
  }
  
  exibirMensagemErro(status: number): void{    
    if (status === 0)
      this.exibirMensagem('Falha na requisição.\nEntre em contato com o suporte!')
    else if (status === 400)
      this.exibirMensagem('Verifique os dados que estão sendo enviados!');
    else if (status === 500)
      this.exibirMensagem('Erro interno no servidor!\nEntre em contato com o suporte!');
  }

  validarDadosExibirMensagem():boolean {
    let msg:string = '';

    if (this.Medicamento.Nome === '') {
        msg += 'Nome;\n';
    }
    
    if (this.Medicamento.DataFabricacao.toString() === '') {
        msg += 'Data de fabricação;\n';
    }
    
    if (this.Medicamento.DataVencimento !== null 
        && this.Medicamento.DataVencimento?.toString() !== '' 
        && this.Medicamento.DataVencimento <= this.Medicamento.DataFabricacao) {
        msg += 'Data de fabricação não pode ser maior ou igual a data de vencimento.';
    }
    
    if (msg !== '') {
        msg = 'Preencha corretamente os dados a seguir:\n' + msg;
        this.exibirMensagem(msg);
        return false;
    }

    return true;
  }
}
