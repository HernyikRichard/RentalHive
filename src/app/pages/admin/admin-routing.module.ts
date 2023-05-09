import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'edit/:id', component: UserEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }