import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NicknamePage } from './nickname.page';

const routes: Routes = [
  {
    path: '',
    component: NicknamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NicknamePageRoutingModule {}
