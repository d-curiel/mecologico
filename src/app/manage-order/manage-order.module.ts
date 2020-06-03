import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageOrderPageRoutingModule } from './manage-order-routing.module';

import { ManageOrderPage } from './manage-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageOrderPageRoutingModule
  ],
  declarations: [ManageOrderPage]
})
export class ManageOrderPageModule {}
