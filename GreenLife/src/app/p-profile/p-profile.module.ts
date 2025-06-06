import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PProfilePageRoutingModule } from './p-profile-routing.module';

import { PProfilePage } from './p-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PProfilePageRoutingModule
  ],
  declarations: [PProfilePage]
})
export class PProfilePageModule {}
