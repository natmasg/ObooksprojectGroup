import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage3Page } from './register-page3.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPage3PageRoutingModule {}
