import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalogs',
    pathMatch: 'full'
  },
  {
    path: 'catalogs',
    loadChildren: () => import('./catalogs/catalogs.module').then( m => m.CatalogsPageModule)
  },
  {
    path: 'personal-information',
    loadChildren: () => import('./personal-information/personal-information.module').then( m => m.PersonalInformationPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'manage-order',
    loadChildren: () => import('./manage-order/manage-order.module').then( m => m.ManageOrderPageModule)
  },
  {
    path: 'product-to-order',
    loadChildren: () => import('./modals/product-to-order/product-to-order.module').then( m => m.ProductToOrderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
