import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibraryDetailPageRoutingModule } from './library-detail-routing.module';

import { LibraryDetailPage } from './library-detail.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [LibraryDetailPage]
})
export class LibraryDetailPageModule {}
