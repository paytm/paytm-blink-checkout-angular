import { NgModule } from '@angular/core';
import { CheckoutComponent } from './components/checkout.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [CommonModule],
  exports: [CheckoutComponent]
})
export class CheckoutModule { }
