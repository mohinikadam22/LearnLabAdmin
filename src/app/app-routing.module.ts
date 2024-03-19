import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { AuthGuard } from './Guards/auth.guard';

import { AdminAuthComponent } from './AdminPages/admin/admin-auth/admin-auth.component';
import { AdminAuth } from './Guards/admin-auth.guard';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path:'',redirectTo:'landing',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'landing',component:LandingComponent},
  {path:'member',component:AdminAuthComponent},
  {path:'payment',component:PaymentComponent},

  {
  path:'access',
  canActivate:[AuthGuard],loadChildren:()=>import('./Authorized/access/access.module').then((m)=>m.AccessModule)
  },
  {
    path:'main',
    canActivate:[AdminAuth],loadChildren:()=>import('./AdminPages/admin/admin.module').then((m)=>m.AdminModule)
    },
  {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
