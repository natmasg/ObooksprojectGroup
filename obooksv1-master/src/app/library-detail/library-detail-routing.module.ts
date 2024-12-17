import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryDetailPage } from './library-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LibraryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryDetailPageRoutingModule {}
