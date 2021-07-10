import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassementDossierPageRoutingModule } from './classement-dossier-routing.module';

import { ClassementDossierPage } from './classement-dossier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassementDossierPageRoutingModule
  ],
  declarations: [ClassementDossierPage]
})
export class ClassementDossierPageModule {}
