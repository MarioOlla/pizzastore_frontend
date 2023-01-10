import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
