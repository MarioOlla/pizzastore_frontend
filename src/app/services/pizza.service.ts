import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pizza } from '../model/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private apiServer = 'http://localhost:8080/api/pizza';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  lista(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiServer);
  }

  caricaSingolo(id: number): Observable<Pizza | undefined> {
    return this.http.get<Pizza>(this.apiServer + '/' + id.toString());
  }

  aggiorna(ingrediente: Pizza, id: number): Observable<Pizza> {
    return this.http.put<Pizza>(this.apiServer + '/' + id.toString(), ingrediente, this.httpOptions)
  }

  inserisciNuovo(ingrediente: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.apiServer, ingrediente, this.httpOptions)
  }

  rimuovi(id?: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiServer + '/' + id)
  }

}
