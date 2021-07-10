import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TendanceMoyennePage } from './tendance-moyenne.page';

const routes: Routes = [
  {
    path: '',
    component: TendanceMoyennePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TendanceMoyennePageRoutingModule {}
