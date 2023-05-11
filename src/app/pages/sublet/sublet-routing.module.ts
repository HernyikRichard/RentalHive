import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { LandlordGuard } from 'src/app/shared/guards/landlord.guard';
import { EditComponent } from './edit/edit.component';
import { SubletGuard } from 'src/app/shared/guards/sublet.guard';

const routes: Routes = [
  {path: 'create', component: CreateComponent, canActivate: [LandlordGuard]},
  {path: 'view/:id', component: ViewComponent},
  {path: 'edit/:id', component: EditComponent, canActivate: [SubletGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubletRoutingModule { }
