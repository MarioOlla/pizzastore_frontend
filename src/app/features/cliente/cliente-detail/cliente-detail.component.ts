import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

export interface ClienteForm extends FormGroup<{
  id: FormControl<any>;
  nome: FormControl<string>;
  cognome: FormControl<string>;
  indirizzo: FormControl<string>;
  attivo: FormControl<boolean>;
}> { }

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss']
})
export class ClienteDetailComponent implements OnInit, OnChanges{

  idCliente?: number;
  cliente: Cliente = {};

  clienteReactive: ClienteForm = this.fb.group({
    id: this.fb.control(null),
    nome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    cognome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    indirizzo: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(12)]),
    attivo: this.fb.nonNullable.control(true)
  });

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != null) {
      let id = this.route.snapshot.paramMap.get('id');
      this.idCliente = parseInt(id!);
      this.clienteService.caricaSingolo(this.idCliente).subscribe({
        next: c => {
          if (c != null) {
            this.cliente.id = this.idCliente;
            this.cliente.nome = c.nome;
            this.cliente.cognome = c.cognome;
            this.cliente.indirizzo = c.indirizzo;
            this.cliente.attivo = c.attivo;
            this.clienteReactive.setValue({ id: this.idCliente!, nome: c.nome!, cognome: c.cognome!, indirizzo: c.indirizzo!, attivo: c.attivo! })
          }
        }
      });
      if (this.router.url.includes('detail'))
        this.clienteReactive.disable(); // lo posso fare anche particolareggiato con la get del parametro
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.idCliente)
      this.clienteService.caricaSingolo(this.idCliente).subscribe({ next: c => this.cliente = c! });
  }

  save() {
    if (this.router.url.includes('create')){
      this.clienteService.inserisciNuovo(this.clienteReactive.value).subscribe(
        {
          next: c => this.clienteReactive!.patchValue(c),
          complete:() => this.router.navigate(['/cliente'])
        }
      )
    } 
    else{
      this.clienteService.aggiorna(this.clienteReactive.value, this.idCliente!).subscribe(
        {
          next: c => this.clienteReactive!.patchValue(c),
          complete:() => this.router.navigate(['/cliente'])
        }
      )
    }
    this.router.navigate(['cliente']);
  }

  back() {
    this.router.navigate(['cliente']);
  }

  disable(): boolean {
    if (this.router.url.includes('detail'))
      return false;
    else
      return true;
  }
}
