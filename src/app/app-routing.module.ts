import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { VerifyEmailComponent} from './verify-email/verify-email.component';
import { AuthGuard } from "./shared/guard/auth.guard";


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'verify-email-address/:uid',
    component: VerifyEmailComponent
  },
  {
    path: '**',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
