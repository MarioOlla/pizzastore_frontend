import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { ClienteListComponent } from './features/cliente/cliente-list/cliente-list.component';
import { ClienteDetailComponent } from './features/cliente/cliente-detail/cliente-detail.component';
import { BooleanToStringPipe } from './shared/pipes/boolean-to-string.pipe';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ClienteModule } from './features/cliente/cliente.module';
import { SharedModule } from './shared/shared.module';
import { IngredienteModule } from './features/ingrediente/ingrediente.module';
import { PizzaModule } from './features/pizza/pizza.module';
import { OrdineModule } from './features/ordine/ordine.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    ClienteModule,
    IngredienteModule,
    PizzaModule,
    OrdineModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
