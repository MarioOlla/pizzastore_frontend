import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaDetailComponent } from './pizza-detail/pizza-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes =[
  {
    path: '',
    component: PizzaListComponent,
  },
  {
    path: 'detail/:id',
    component: PizzaDetailComponent,
  },
  {
    path: 'edit/:id',
    component: PizzaDetailComponent,
  },
  {
    path: 'create',
    component: PizzaDetailComponent,
  },
]

@NgModule({
  declarations: [
    PizzaListComponent,
    PizzaDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    PizzaListComponent,
    PizzaDetailComponent
  ]
})
export class PizzaModule { }
