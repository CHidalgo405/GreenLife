import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PAboutPageRoutingModule } from './p-about-routing.module';

import { PAboutPage } from './p-about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PAboutPageRoutingModule
  ],
  declarations: [PAboutPage]
})
export class PAboutPageModule {}
