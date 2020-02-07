import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';

import {DashboardComponent} from './dashboard.component';

@NgModule({
    imports: [
        NbActionsModule,
        NbButtonModule,
        NbCardModule,
        NbTabsetModule,
        NbUserModule,
        NbRadioModule,
        NbSelectModule,
        NbListModule,
        NbIconModule,
        FormsModule
    ],
    declarations: [
        DashboardComponent
    ],
  })
  export class DashboardModule { }