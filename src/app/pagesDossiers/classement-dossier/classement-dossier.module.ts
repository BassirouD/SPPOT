import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassementDossierPageRoutingModule } from './classement-dossier-routing.module';

import { ClassementDossierPage } from './classement-dossier.page';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassementDossierPageRoutingModule,
    ChartModule
  ],
  declarations: [ClassementDossierPage]
})
export class ClassementDossierPageModule {}
