import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingrediente } from 'src/app/model/ingrediente';
import { Pizza } from 'src/app/model/pizza';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdineService } from 'src/app/services/ordine.service';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-ordine-detail',
  templateUrl: './ordine-detail.component.html',
  styleUrls: ['./ordine-detail.component.scss']
})
export class OrdineDetailComponent{

  

}
