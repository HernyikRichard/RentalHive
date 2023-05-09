import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
import { LoginGuard } from './shared/services/login.guard';
import { AdminAuthGuard } from './shared/services/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/regist/regist.module').then(m => m.RegistModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'not-found', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
  },
  {
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full', 
  },
  {
    path: '**',
    redirectTo: '/not-found',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }