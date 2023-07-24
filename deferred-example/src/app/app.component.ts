import { Component, OnInit } from '@angular/core';
import { merchantConfig, integrationConfig, merchantHandlers } from './merchant-config';
import { CheckoutService } from 'paytm-blink-checkout-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  mConfig = merchantConfig;
  iConfig = integrationConfig;
  isCheckoutVisible = false;
  openInPopup = false;

  constructor(private readonly checkoutService: CheckoutService) {
    this.initializeCheckout();
  }

  appendHandler(config): any {
    const newConfig = { ...config };
    newConfig.handler = {
      ...merchantHandlers
    }
    return newConfig;
  }

  updateMerchantConfig(config): void {
    try {
      this.mConfig = JSON.parse(config);
    } catch (ex) {
      this.mConfig = {};
    }
  }

  updateIntegrationConfig(config): void {
    try {
      this.iConfig = JSON.parse(config);
    } catch (ex) {
      this.iConfig = {};
    }
  }

  toggleCheckout(): void {
    this.isCheckoutVisible = !this.isCheckoutVisible;
  }

  initializeCheckout(): void {
    const mConfig = this.appendHandler(this.mConfig);
    this.checkoutService.init(mConfig, { env: 'STAGE', openInPopup: this.openInPopup});
  }
}
