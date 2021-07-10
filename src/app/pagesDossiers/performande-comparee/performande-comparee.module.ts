import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerformandeCompareePageRoutingModule } from './performande-comparee-routing.module';

import { PerformandeCompareePage } from './performande-comparee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerformandeCompareePageRoutingModule
  ],
  declarations: [PerformandeCompareePage]
})
export class PerformandeCompareePageModule {}
