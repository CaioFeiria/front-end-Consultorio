import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AutenticacoesService } from '../services/autenticacoes/autenticacoes.service';


@Injectable({
  providedIn: 'root'
})

export class guardGuard implements CanActivate{

  constructor(private autenticacoesServices: AutenticacoesService, private router:Router){}

  canActivate(): boolean{
    if (this.autenticacoesServices.authLogin)
      return true;
    
    this.router.navigate([""]);
    return false;
  }
}