import { NgModule } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor';
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
        FormsModule,
        MonacoEditorModule
    ],
    declarations: [
        DashboardComponent
    ],
  })
  export class DashboardModule { }