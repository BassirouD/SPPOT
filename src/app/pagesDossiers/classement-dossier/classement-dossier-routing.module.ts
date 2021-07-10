import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassementDossierPage } from './classement-dossier.page';

const routes: Routes = [
  {
    path: '',
    component: ClassementDossierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassementDossierPageRoutingModule {}
