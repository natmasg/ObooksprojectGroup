import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NicknamePageRoutingModule } from './nickname-routing.module';

import { NicknamePage } from './nickname.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NicknamePageRoutingModule
  ],
  declarations: [NicknamePage]
})
export class NicknamePageModule {}
