import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PSettingsPage } from './p-settings.page';

const routes: Routes = [
  {
    path: '',
    component: PSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PSettingsPageRoutingModule {}
