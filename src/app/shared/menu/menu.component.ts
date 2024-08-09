import { Component } from '@angular/core';
import { AutenticacoesService } from '../../services/autenticacoes/autenticacoes.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(
    private autenticacoesServices: AutenticacoesService, 
    private router:Router, 
    private dialog:MatDialog){
  }

  logout(): void{
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { mensagem: `Deseja sair?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.autenticacoesServices.desautenticar();
        this.router.navigate(['']);
      }
    });
  }

}
