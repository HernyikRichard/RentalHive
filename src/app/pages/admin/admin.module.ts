import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatButtonToggleModule
  ]
})
export class AdminModule { }
