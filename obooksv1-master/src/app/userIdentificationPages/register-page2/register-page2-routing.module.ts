import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage2Page } from './register-page2.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPage2PageRoutingModule {}
