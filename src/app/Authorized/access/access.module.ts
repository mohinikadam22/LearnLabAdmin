import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { AccessRoutingModule } from './access-routing.module';

@NgModule({
  declarations: [
    ViewDetailsComponent,
  ],
  imports: [
    CommonModule,
    AccessRoutingModule,
   
  ]
})
export class AccessModule { }
