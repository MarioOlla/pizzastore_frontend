import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanToStringPipe } from './pipes/boolean-to-string.pipe';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [
    BooleanToStringPipe
  ],
  imports: [
    CommonModule,   
  ],
  exports:[
    BooleanToStringPipe
  ]
})
export class SharedModule { }
