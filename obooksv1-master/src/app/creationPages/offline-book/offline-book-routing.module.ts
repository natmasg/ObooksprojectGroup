import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfflineBookPage } from './offline-book.page';

const routes: Routes = [
  {
    path: '',
    component: OfflineBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfflineBookPageRoutingModule {}
