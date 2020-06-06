import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductToOrderPage } from './product-to-order.page';

const routes: Routes = [
  {
    path: '',
    component: ProductToOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductToOrderPageRoutingModule {}
