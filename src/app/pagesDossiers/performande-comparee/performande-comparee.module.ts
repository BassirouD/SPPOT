import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerformandeCompareePageRoutingModule } from './performande-comparee-routing.module';

import { PerformandeCompareePage } from './performande-comparee.page';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerformandeCompareePageRoutingModule,
    ChartModule
  ],
  declarations: [PerformandeCompareePage]
})
export class PerformandeCompareePageModule {}
