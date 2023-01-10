import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const routes:Routes = [
  {
    path: '',
    component: ClienteListComponent,
  },
  {
    path: 'detail/:id',
    component: ClienteDetailComponent,
  },
  {
    path: 'edit/:id',
    component: ClienteDetailComponent,
  },
  {
    path: 'create',
    component: ClienteDetailComponent,
  },

]

@NgModule({
  declarations: [
    ClienteDetailComponent,
    ClienteListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ClienteDetailComponent,
    ClienteListComponent
  ]
})
export class ClienteModule { }
