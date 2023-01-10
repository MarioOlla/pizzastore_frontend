import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IngredienteDetailComponent } from './ingrediente-detail/ingrediente-detail.component';
import { IngredienteListComponent } from './ingrediente-list/ingrediente-list.component';

const routes:Routes =[
  {
    path: '',
    component: IngredienteListComponent,
  },
  {
    path: 'detail/:id',
    component: IngredienteDetailComponent,
  },
  {
    path: 'edit/:id',
    component: IngredienteDetailComponent,
  },
  {
    path: 'create',
    component: IngredienteDetailComponent,
  },
]

@NgModule({
  declarations: [
    IngredienteListComponent,
    IngredienteDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    IngredienteListComponent,
    IngredienteDetailComponent
  ]
})
export class IngredienteModule { }
