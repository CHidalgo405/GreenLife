import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PDeletePage } from './p-delete.page';

const routes: Routes = [
  {
    path: '',
    component: PDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PDeletePageRoutingModule {}
