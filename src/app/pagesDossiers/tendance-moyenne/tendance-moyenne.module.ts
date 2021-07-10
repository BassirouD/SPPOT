import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TendanceMoyennePageRoutingModule } from './tendance-moyenne-routing.module';

import { TendanceMoyennePage } from './tendance-moyenne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TendanceMoyennePageRoutingModule
  ],
  declarations: [TendanceMoyennePage]
})
export class TendanceMoyennePageModule {}
