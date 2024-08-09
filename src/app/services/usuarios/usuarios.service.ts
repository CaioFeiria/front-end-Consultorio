import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/model.usuario';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private Url:string = `${environment.apiURL}/usuarios`;

  constructor(private httpClient:HttpClient) {

   }

   getAll(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.Url);
   }

   getById(id:number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.Url}/${id}`);
   }

   getByName(nome:string): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.Url}?nome=${nome}`);
   }

   post(usuario:Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(`${this.Url}`, usuario);
   }

   put(usuario:Usuario): Observable<Usuario>{
    return this.httpClient.put<Usuario>(`${this.Url}/${usuario.Id}`, usuario);
   }

   delete(id:number): Observable<Usuario>{
    return this.httpClient.delete<Usuario>(`${this.Url}/${id}`);
   }
}
