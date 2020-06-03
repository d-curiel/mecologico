import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogsPage } from './catalogs.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogsPageRoutingModule {}
