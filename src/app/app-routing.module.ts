import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { 
    path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'profile', 
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) 
  },
  {
    path: 'not-found', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  {
    path: '', 
    redirectTo: '/home',
    pathMatch: 'full', 
  },

  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },

  { path: 'registration', loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule) },
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
