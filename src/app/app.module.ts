import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StringifyJsonPipe } from './pipes/stringify-json.pipe';
import { CheckoutModule } from 'paytm-blink-checkout-angular';

@NgModule({
  declarations: [
    AppComponent,
    StringifyJsonPipe
  ],
  imports: [
    BrowserModule,
    CheckoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
