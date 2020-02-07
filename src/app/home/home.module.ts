import { NgModule } from '@angular/core';
import { NbMenuModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentModule } from '../components/component.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    DashboardModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    ComponentModule
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule {
}
