import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibrarySelectorPageRoutingModule } from './library-selector-routing.module';

import { LibrarySelectorPage } from './library-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibrarySelectorPageRoutingModule
  ],
  declarations: [LibrarySelectorPage]
})
export class LibrarySelectorPageModule {}
