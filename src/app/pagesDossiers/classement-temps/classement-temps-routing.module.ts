import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassementTempsPage } from './classement-temps.page';

const routes: Routes = [
  {
    path: '',
    component: ClassementTempsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassementTempsPageRoutingModule {}
