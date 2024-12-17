import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage4Page } from './register-page4.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPage4PageRoutingModule {}
