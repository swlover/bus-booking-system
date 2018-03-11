import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TicketBookingModule } from './ticket-booking/ticket-booking.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpModule } from '@angular/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule, TicketBookingModule, HttpModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
