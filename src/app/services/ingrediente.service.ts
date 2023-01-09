import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Ingrediente } from '../model/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private apiServer = 'http://localhost:8080/api/ingrediente';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  lista(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiServer);
  }

  caricaSingolo(id: number): Observable<Ingrediente | undefined> {
    return this.http.get<Ingrediente>(this.apiServer + '/' + id.toString());
  }

  aggiorna(ingrediente: Ingrediente, id: number): Observable<Ingrediente> {
    return this.http.put<Ingrediente>(this.apiServer + '/' + id.toString(), ingrediente, this.httpOptions)
  }

  inserisciNuovo(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(this.apiServer, ingrediente, this.httpOptions)
  }

  rimuovi(id?: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiServer + '/' + id)
  }
}
