import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PProfilePageRoutingModule } from './p-profile-routing.module';

import { PProfilePage } from './p-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PProfilePage]
})
export class PProfilePageModule {}
