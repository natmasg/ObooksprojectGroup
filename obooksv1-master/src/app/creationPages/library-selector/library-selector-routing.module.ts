import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibrarySelectorPage } from './library-selector.page';

const routes: Routes = [
  {
    path: '',
    component: LibrarySelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibrarySelectorPageRoutingModule {}
