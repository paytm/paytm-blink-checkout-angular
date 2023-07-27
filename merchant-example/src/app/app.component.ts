import { Component, OnInit } from '@angular/core';
import { CONFIG } from './merchant-config';
import { CheckoutService } from 'paytm-blink-checkout-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  config = CONFIG;
  isCheckoutVisible = false;
  openInPopup = true;

  constructor(private readonly checkoutService: CheckoutService) {
    this.initializeCheckout();
  }

  appendHandler(config: any): any {
    const newConfig = { ...config };

    newConfig.handler = {
      notifyMerchant: this.notifyMerchantHandler
    }

    return newConfig;
  }

  notifyMerchantHandler = (eventType: any, data: any): void => {
    console.log('MERCHANT NOTIFY LOG', eventType, data);
  }

  updateConfig(config: any): void {
    try {
      this.config = JSON.parse(config);
    } catch (ex) {
      this.config = JSON.parse('');
    }
  }

  toggleCheckout(): void {
    this.isCheckoutVisible = !this.isCheckoutVisible;
  }

  initializeCheckout(): void {
    const config = this.appendHandler(this.config);
    this.checkoutService.init(config, { env: 'STAGE', openInPopup: this.openInPopup});
  }
}
