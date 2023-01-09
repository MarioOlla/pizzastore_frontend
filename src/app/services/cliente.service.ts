import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiServer = 'http://localhost:8080/api/cliente';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  lista(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiServer);
  }

  caricaSingolo(id: number): Observable<Cliente | undefined> {
    return this.http.get<Cliente>(this.apiServer + '/' + id.toString());
  }

  aggiorna(cliente: Cliente, id: number): Observable<Cliente> {
    return this.http.put<Cliente>(this.apiServer + '/' + id.toString(), cliente, this.httpOptions)
  }

  inserisciNuovo(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiServer, cliente, this.httpOptions)
  }

  rimuovi(id?: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiServer + '/' + id)
  }

}
