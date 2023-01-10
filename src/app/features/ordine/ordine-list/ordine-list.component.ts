import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ordine } from 'src/app/model/ordine';
import { OrdineService } from 'src/app/services/ordine.service';

@Component({
  selector: 'app-ordine-list',
  templateUrl: './ordine-list.component.html',
  styleUrls: ['./ordine-list.component.scss']
})
export class OrdineListComponent implements OnInit{

  constructor(private ordineService:OrdineService, private router:Router){};

  ngOnInit(): void {
    this.getData();
  }

  ordini?:Ordine[];

  getData() {
    this.ordineService.lista().subscribe(res => {
      this.ordini = res;
    });
  }

  show(id: number){
    this.router.navigate(["ordine/detail/", id]);
  }

  delete(id: number){
    this.ordineService.rimuovi(id).subscribe({complete:() => this.getData()})
    
  }

  edit(id: number){
    this.router.navigate(["ordine/edit/", id]);
  }

  create(){
    this.router.navigate(["ordine/create"]);
  }

}
