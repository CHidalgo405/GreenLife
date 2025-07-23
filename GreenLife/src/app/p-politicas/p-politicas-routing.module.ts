import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PPoliticasPage } from './p-politicas.page';

const routes: Routes = [
  {
    path: '',
    component: PPoliticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PPoliticasPageRoutingModule {}
