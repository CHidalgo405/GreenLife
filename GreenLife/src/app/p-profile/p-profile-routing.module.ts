import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PProfilePage } from './p-profile.page';

const routes: Routes = [
  {
    path: '',
    component: PProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PProfilePageRoutingModule {}
