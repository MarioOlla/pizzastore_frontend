import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  constructor(private clienteService: ClienteService, private router: Router
  ) { };

  ngOnInit(): void {
    this.getData();
  }

  clienti?: Cliente[];

  getData() {
    this.clienteService.lista().subscribe(res => {
      this.clienti = res;
    });
  }

  show(id: number){
    this.router.navigate(["cliente/detail/", id]);
  }

  delete(id: number){
    this.clienteService.rimuovi(id).subscribe({complete:() => this.getData()})
    
  }

  edit(id: number){
    this.router.navigate(["cliente/edit/", id]);
  }

  create(){
    this.router.navigate(["cliente/create"]);
  }
}
