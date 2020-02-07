import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { 
  NbButtonModule, 
  NbCardModule, 
  NbActionsModule, 
  NbUserModule, 
  NbIconModule,
  NbContextMenuModule 
} 
from '@nebular/theme';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbCardModule,
    NbActionsModule,
    NbUserModule,
    NbContextMenuModule
  ],
  exports: [
    HeaderComponent,
    NotFoundComponent
  ]
})
export class ComponentModule { }