import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PDeletePageRoutingModule } from './p-delete-routing.module';

import { PDeletePage } from './p-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PDeletePageRoutingModule
  ],
  declarations: [PDeletePage]
})
export class PDeletePageModule {}
