import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductToOrderPageRoutingModule } from './product-to-order-routing.module';

import { ProductToOrderPage } from './product-to-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductToOrderPageRoutingModule
  ],
  declarations: [ProductToOrderPage]
})
export class ProductToOrderPageModule {}
