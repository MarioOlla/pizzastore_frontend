import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ordine } from '../model/ordine';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  private apiServer = 'http://localhost:8080/api/ordine';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  lista(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(this.apiServer);
  }

  caricaSingolo(id: number): Observable<Ordine | undefined> {
    return this.http.get<Ordine>(this.apiServer + '/' + id.toString());
  }

  aggiorna(ordine: Ordine, id: number): Observable<Ordine> {
    return this.http.put<Ordine>(this.apiServer + '/' + id.toString(), ordine, this.httpOptions)
  }

  inserisciNuovo(ordine: Ordine): Observable<Ordine> {
    return this.http.post<Ordine>(this.apiServer, ordine, this.httpOptions)
  }

  rimuovi(id?: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiServer + '/' + id)
  }
}
