import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogsPageRoutingModule } from './catalogs-routing.module';

import { CatalogsPage } from './catalogs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogsPageRoutingModule
  ],
  declarations: [CatalogsPage]
})
export class CatalogsPageModule {}
