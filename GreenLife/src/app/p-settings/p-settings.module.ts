import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PSettingsPageRoutingModule } from './p-settings-routing.module';

import { PSettingsPage } from './p-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PSettingsPageRoutingModule
  ],
  declarations: [PSettingsPage]
})
export class PSettingsPageModule {}
