import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingrediente } from 'src/app/model/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';

export interface IngredienteForm extends FormGroup<{
  id: FormControl<any>;
  codice: FormControl<string>;
  descrizione: FormControl<string>;
  prezzo: FormControl<number>;
}> {};

@Component({
  selector: 'app-ingrediente-detail',
  templateUrl: './ingrediente-detail.component.html',
  styleUrls: ['./ingrediente-detail.component.scss']
})
export class IngredienteDetailComponent implements OnInit, OnChanges {

   constructor(private ingredienteService: IngredienteService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  idIngrediente?: number;
  ingrediente: Ingrediente = {};

  ingredienteReactive: IngredienteForm = this.fb.group({
    id: this.fb.control(null),
    codice: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    descrizione: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    prezzo: this.fb.nonNullable.control(0, [Validators.required, Validators.min(0.1)]),
  })


  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != null) {
      let id = this.route.snapshot.paramMap.get('id');
      this.idIngrediente = parseInt(id!);
      this.ingredienteService.caricaSingolo(this.idIngrediente).subscribe({
        next: i => {
          if (i != null) {
            this.ingrediente.id = this.idIngrediente;
            this.ingrediente.codice = i.codice;
            this.ingrediente.descrizione = i.descrizione;
            this.ingrediente.prezzo = i.prezzo;
            this.ingredienteReactive.setValue({ id: this.idIngrediente!, codice: i.codice!, descrizione: i.descrizione!, prezzo: i.prezzo! })
          }
        }
      });
      if (this.router.url.includes('detail'))
        this.ingredienteReactive.disable();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.idIngrediente)
      this.ingredienteService.caricaSingolo(this.idIngrediente).subscribe({ next: c => this.ingrediente = c! });
  }

  save() {
    if (this.router.url.includes('create')){
      this.ingredienteService.inserisciNuovo(this.ingredienteReactive.value).subscribe(
        {
          next: c => this.ingredienteReactive!.patchValue(c),
          complete:() => this.router.navigate(['/ingrediente'])
        }
      )
    } 
    else{
      this.ingredienteService.aggiorna(this.ingredienteReactive.value, this.idIngrediente!).subscribe(
        {
          next: c => this.ingredienteReactive!.patchValue(c),
          complete:() => this.router.navigate(['/ingrediente'])
        }
      )
    }
    this.router.navigate(['ingrediente']);
  }

  back() {
    this.router.navigate(['ingrediente']);
  }

  disable(): boolean {
    if (this.router.url.includes('detail'))
      return false;
    else
      return true;
  }

}
