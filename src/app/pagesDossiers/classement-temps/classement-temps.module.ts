import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassementTempsPageRoutingModule } from './classement-temps-routing.module';

import { ClassementTempsPage } from './classement-temps.page';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassementTempsPageRoutingModule,
    ChartModule
  ],
  declarations: [ClassementTempsPage]
})
export class ClassementTempsPageModule {}
