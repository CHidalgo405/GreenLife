import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PAboutPage } from './p-about.page';

const routes: Routes = [
  {
    path: '',
    component: PAboutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PAboutPageRoutingModule {}
