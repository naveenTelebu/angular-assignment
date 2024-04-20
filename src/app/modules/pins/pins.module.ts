import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PinsComponent } from './containers/pins/pins.component';
import { PinsRoutingModule } from './pins-routing.module';

@NgModule({
  declarations: [PinsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    NgModule,
    PinsRoutingModule,
  ],
})
export class PinsModule {}
