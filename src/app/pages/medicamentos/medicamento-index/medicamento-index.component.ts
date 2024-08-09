import { Component } from '@angular/core';
import { MedicamentosService } from '../../../services/medicamentos/medicamentos.service';
import { Medicamento } from '../../../models/model.medicamento';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-medicamento-index',
  templateUrl: './medicamento-index.component.html',
  styleUrl: './medicamento-index.component.css'
})
export class MedicamentoIndexComponent {

  Medicamentos: Medicamento[];

  Id: number | null;
  Nome: string;

  constructor(private medicamentosService:MedicamentosService, private dialog:MatDialog){
    this.Medicamentos = [];
    this.Id = null;
    this.Nome = '';
  }

  definirPesquisa(): void{

    this.Medicamentos = [];

    if (this.Id !== null) {
      this.pesquisarPorId();
      return;
    }

    if (this.Nome !== '') {
      this.pesquisarPorNome();
      return;
    }

    this.pesquisar();
  }

  pesquisar(): void{
    this.medicamentosService.getAll().subscribe({
      next: (jsonMedicamentos:Medicamento[]) => {
        this.Medicamentos = jsonMedicamentos;
        if (this.Medicamentos.length === 0) 
          this.exibirMensagemErro(404);
      },
      error: (jsonErro: any) => {
        this.exibirMensagemErro(jsonErro.status);
      }
    });
  }

  pesquisarPorId() :void{
    this.medicamentosService.getById(Number(this.Id)).subscribe({
      next: (jsonMedicamento:Medicamento) => {
        this.Medicamentos = [jsonMedicamento];
      },
      error: (jsonErro: any) => {
        this.exibirMensagemErro(jsonErro.status);
      }
    });
  }

  pesquisarPorNome(): void{
    this.medicamentosService.getByNome(this.Nome).subscribe({
      next: (jsonMedicamentos:Medicamento[]) => {
        this.Medicamentos = jsonMedicamentos;
        if (this.Medicamentos.length === 0) 
          this.exibirMensagemErro(404);
      },
      error: (jsonErro: any) => {
        this.exibirMensagemErro(jsonErro.status);
      }
    });
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, 
      {data:{mensagem:msg}});
  }

  exibirMensagemErro(status: number): void{    
    if (status === 0)
      this.exibirMensagem('Falha na requisição.\nEntre em contato com o suporte!')
    else if (status === 404)
      this.exibirMensagem('Nenhum medicamento foi encontrado!');
    else if (status === 500)
      this.exibirMensagem('Erro interno no servidor!\nEntre em contato com o suporte!');
  }
}