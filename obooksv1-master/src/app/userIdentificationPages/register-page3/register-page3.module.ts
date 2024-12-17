import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPage3PageRoutingModule } from './register-page3-routing.module';

import { RegisterPage3Page } from './register-page3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPage3PageRoutingModule
  ],
  declarations: [RegisterPage3Page]
})
export class RegisterPage3PageModule {}
