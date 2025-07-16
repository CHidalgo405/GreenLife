import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenCompraPageRoutingModule } from './resumen-compra-routing.module';

import { ResumenCompraPage } from './resumen-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenCompraPageRoutingModule
  ],
  declarations: [ResumenCompraPage]
})
export class ResumenCompraPageModule {}
