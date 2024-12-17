import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPage2PageRoutingModule } from './register-page2-routing.module';

import { RegisterPage2Page } from './register-page2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPage2PageRoutingModule
  ],
  declarations: [RegisterPage2Page]
})
export class RegisterPage2PageModule {}
