import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeComponent } from './features/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'cliente',
    loadChildren: () => import('./features/cliente/cliente.module').then(m => m.ClienteModule),
    canActivate: [AuthGuard]    
  },
  {
    path: 'ingrediente',
    loadChildren: () => import('./features/ingrediente/ingrediente.module').then(m => m.IngredienteModule),
    canActivate: [AuthGuard]    
  },
  {
    path: 'pizza',
    loadChildren: () => import('./features/pizza/pizza.module').then(m => m.PizzaModule),
    canActivate: [AuthGuard]    
  },
  {
    path: 'ordine',
    loadChildren: () => import('./features/ordine/ordine.module').then(m => m.OrdineModule),
    canActivate: [AuthGuard]    
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
