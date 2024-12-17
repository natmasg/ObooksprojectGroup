import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfflineBookPageRoutingModule } from './offline-book-routing.module';

import { OfflineBookPage } from './offline-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfflineBookPageRoutingModule
  ],
  declarations: [OfflineBookPage]
})
export class OfflineBookPageModule {}
