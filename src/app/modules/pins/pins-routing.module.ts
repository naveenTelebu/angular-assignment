import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PinsComponent } from './containers/pins/pins.component';

const routes: Routes = [  { path: "", component: PinsComponent }, { path: '**', redirectTo: "" } ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PinsRoutingModule { }
