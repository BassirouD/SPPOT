import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TendanceEvolutionPageRoutingModule } from './tendance-evolution-routing.module';

import { TendanceEvolutionPage } from './tendance-evolution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TendanceEvolutionPageRoutingModule
  ],
  declarations: [TendanceEvolutionPage]
})
export class TendanceEvolutionPageModule {}
