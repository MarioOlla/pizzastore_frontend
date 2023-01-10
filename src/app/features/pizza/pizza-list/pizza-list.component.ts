import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pizza } from 'src/app/model/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit{

  constructor(private pizzaservice:PizzaService, private router: Router
  ) { };

  ngOnInit(): void {
    this.getData();
  }

  pizze?: Pizza[];

  getData() {
    this.pizzaservice.lista().subscribe(res => {
      this.pizze = res;
    });
  }

  show(id: number){
    this.router.navigate(["pizza/detail/", id]);
  }

  delete(id: number){
    this.pizzaservice.rimuovi(id).subscribe({complete:() => this.getData()})
    
  }

  edit(id: number){
    this.router.navigate(["pizza/edit/", id]);
  }

  create(){
    this.router.navigate(["pizza/create"]);
  }
}
