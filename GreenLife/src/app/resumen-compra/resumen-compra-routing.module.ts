import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenCompraPage } from './resumen-compra.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenCompraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenCompraPageRoutingModule {}
