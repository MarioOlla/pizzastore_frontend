import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/model/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';

@Component({
  selector: 'app-ingrediente-list',
  templateUrl: './ingrediente-list.component.html',
  styleUrls: ['./ingrediente-list.component.scss']
})
export class IngredienteListComponent implements OnInit {

   constructor(private ingredienteService: IngredienteService, private router: Router
  ) { };

  ngOnInit(): void {
    this.getData();
  }

  ingredienti?: Ingrediente[];

  getData() {
    this.ingredienteService.lista().subscribe(res => {
      this.ingredienti = res;
    });
  }

  show(id: number){
    this.router.navigate(["ingrediente/detail/", id]);
  }

  delete(id: number){
    this.ingredienteService.rimuovi(id).subscribe({complete:() => this.getData()})
    
  }

  edit(id: number){
    this.router.navigate(["ingrediente/edit/", id]);
  }

  create(){
    this.router.navigate(["ingrediente/create"]);
  }
}
