import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PPoliticasPageRoutingModule } from './p-politicas-routing.module';

import { PPoliticasPage } from './p-politicas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PPoliticasPageRoutingModule
  ],
  declarations: [PPoliticasPage]
})
export class PPoliticasPageModule {}
