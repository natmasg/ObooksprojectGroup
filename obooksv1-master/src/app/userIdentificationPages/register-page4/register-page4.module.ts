import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPage4PageRoutingModule } from './register-page4-routing.module';

import { RegisterPage4Page } from './register-page4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPage4PageRoutingModule
  ],
  declarations: [RegisterPage4Page]
})
export class RegisterPage4PageModule {}
