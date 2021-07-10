import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerformandeCompareePage } from './performande-comparee.page';

const routes: Routes = [
  {
    path: '',
    component: PerformandeCompareePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformandeCompareePageRoutingModule {}
