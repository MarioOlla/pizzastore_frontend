import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingrediente } from 'src/app/model/ingrediente';
import { Pizza } from 'src/app/model/pizza';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.scss']
})
export class PizzaDetailComponent implements OnInit, OnChanges{

  constructor(private pizzaService:PizzaService,private ingredienteService: IngredienteService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  idPizza?: number;
  ingredienti?:Ingrediente[];
  pizza: Pizza = {};

  pizzaReactive: FormGroup = this.fb.group({
    id: this.fb.control(null),
    descrizione: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    prezzo: this.fb.nonNullable.control(0, [Validators.required, Validators.min(5.5)]),
  })

  ngOnInit(): void {
    
    this.ingredienteService.lista().subscribe((res) => {
      
      this.ingredienti = res;

      this.ingredienti.forEach(elem => {this.pizzaReactive.addControl(elem.descrizione!,this.fb.nonNullable.control(false,[Validators.required]))})

      if (this.route.snapshot.paramMap.get('id') != null) {
        let id = this.route.snapshot.paramMap.get('id');
        this.idPizza = parseInt(id!);
        this.pizzaService.caricaSingolo(this.idPizza).subscribe({
          next: p => {
            if (p != null) {
              this.pizza.id = this.idPizza;
              this.pizza.descrizione = p.descrizione;
              this.pizza.prezzo = p.prezzo;
              this.pizza.ingredienti = p.ingredienti;
              this.pizzaReactive.patchValue({ id: this.idPizza!, descrizione: p.descrizione!, prezzo: p.prezzo! })
              this.ingredienti!.forEach(elem => {
                if(p.ingredienti!.find(ing => ing.descrizione === elem.descrizione) != null){
                  this.pizzaReactive.get(elem.descrizione!)?.setValue(true);
                }
              })
            }
          }
        });      
        if (this.router.url.includes('detail'))
          this.pizzaReactive.disable();
      }
      this.pizzaReactive.get('prezzo')!.disable();
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.idPizza){
      this.pizzaService.caricaSingolo(this.idPizza).subscribe({ next: p => this.pizza = p! });
    }
  }

  save() {
    let pizzaToSave:Pizza = {};
    let ingredientiToAssign:Ingrediente[] = prendiIngredienti(this.pizzaReactive, this.ingredienti!)
    if (this.router.url.includes('create')){
      pizzaToSave = {
        descrizione: this.pizzaReactive.value.descrizione,
        ingredienti: ingredientiToAssign,
        prezzo: calcolaPrezzo(ingredientiToAssign)
      }
      this.pizzaService.inserisciNuovo(pizzaToSave).subscribe(
        {
          complete:() => this.router.navigate(['/pizza'])
        }
      )
    } 
    else{
      pizzaToSave = {
        id: this.pizzaReactive.value.id,
        descrizione: this.pizzaReactive.value.descrizione,
        ingredienti: ingredientiToAssign,
        prezzo:calcolaPrezzo(ingredientiToAssign)
      }
      this.pizzaService.aggiorna(pizzaToSave, this.idPizza!).subscribe(
        {
          // next: p => this.pizzaReactive!.patchValue({
          //   id: this.idPizza,
          //   descrizione:p.descrizione,
          //   prezzo:p.prezzo,
          //   ingredienti: p.ingredienti
          // }),
          complete:() => this.router.navigate(['/pizza'])
        }
      )
    }
    this.router.navigate(['pizza']);
  }

  back() {
    this.router.navigate(['pizza']);
  }

  disable(): boolean {
    if (this.router.url.includes('detail'))
      return false;
    else
      return true;
  }

}
function calcolaPrezzo(ing: Ingrediente[]): number {
  let res:number = 5.5;//da sostituire con il prezzo base
  ing.forEach(elem => res+=elem.prezzo!)
  return res;
}

function prendiIngredienti(gruppo:FormGroup, tutti:Ingrediente[]): Ingrediente[] {
  let res:Ingrediente[] = [];
  tutti.forEach(elem => {
    if (gruppo.get(elem.descrizione!) != null && gruppo.get(elem.descrizione!)?.getRawValue() == true){
      res.push(elem);
    }
  })
  return res;
}


