import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdineListComponent } from './ordine-list/ordine-list.component';
import { OrdineDetailComponent } from './ordine-detail/ordine-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes =[
  {
    path: '',
    component: OrdineListComponent,
  },
  {
    path: 'detail/:id',
    component: OrdineDetailComponent,
  },
  {
    path: 'edit/:id',
    component: OrdineDetailComponent,
  },
  {
    path: 'create',
    component: OrdineDetailComponent,
  },
]

@NgModule({
  declarations: [
    OrdineListComponent,
    OrdineDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    OrdineListComponent,
    OrdineDetailComponent
  ]
})
export class OrdineModule { }
