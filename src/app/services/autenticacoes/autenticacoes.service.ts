import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../models/model.login';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Usuario } from '../../models/model.usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacoesService {

  private Url: string = `${environment.apiURL}/autenticacoes`;

  constructor(private httpClient: HttpClient) {

  }

  autenticar(login: Login):Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.Url, login)
    .pipe(tap({
        next: ()=>{
          localStorage.setItem('usuario', btoa(JSON.stringify(login)))
        }
      })
    )
  }

  get authLogin(): boolean{
    return localStorage.getItem('usuario') ? true : false;
  }

  desautenticar() :void{
    localStorage.clear();
  }

}
