import { CheckoutService } from './../services/checkout.service';
import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import CONSTANTS from '../constants';

@Component({
  selector: 'paytm-checkout',
  template: `<div [id]="checkoutService.checkoutJsContainerId"><div>`,
})
export class CheckoutComponent implements AfterViewInit, OnDestroy {
  private subs: Subscription;

  constructor(readonly checkoutService: CheckoutService) {}

  ngAfterViewInit(): void {
    this.subs = this.checkoutService
      .checkoutJsInstance$
      .subscribe(this.invoke);
  }

  invoke(checkoutJsInstance): void {
    if (checkoutJsInstance && checkoutJsInstance.invoke) {
      try {
        checkoutJsInstance.invoke();
      } catch (error) {
        console.error(CONSTANTS.ERRORS.INVOKE, error);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
