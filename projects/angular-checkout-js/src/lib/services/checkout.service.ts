import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import CONSTANTS from '../constants';
import { WINDOW_TOKEN, Window } from './window.service';
import { ReplaySubject } from 'rxjs';
import { CheckoutInstance } from './../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements OnDestroy {
  private config: any;
  private openInPopup = true;
  readonly checkoutJsContainerId = CONSTANTS.IDS.CHECKOUT_ELEMENT + (new Date()).getTime();

  private readonly checkoutJsInstanceSource$ = new ReplaySubject<CheckoutInstance>(1);
  readonly checkoutJsInstance$ = this.checkoutJsInstanceSource$.asObservable();

  constructor(
    @Inject(WINDOW_TOKEN) private readonly window: Window,
    @Inject(DOCUMENT) private readonly document: any) {
  }

  init(config: any, openInPopup = true): void {
    const merchantId = config && config.merchant && config.merchant.mid;

    if (merchantId) {
      this.config = config;
      this.openInPopup = openInPopup;
      this.loadCheckoutScript(merchantId);
    } else {
      console.error(CONSTANTS.ERRORS.MERCHANT_ID_NOT_FOUND);
    }
  }

  private loadCheckoutScript(merchantId: string): void {
    const scriptElement = this.document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = CONSTANTS.LINKS.CHECKOUT_JS_URL.concat(merchantId);
    scriptElement.type = 'application/javascript';
    scriptElement.onload = this.setupCheckoutJs;
    this.document.body.appendChild(scriptElement);
  }

  private setupCheckoutJs = (): void => {
    const checkoutJsInstance = this.getCheckoutJsObj();

    if (checkoutJsInstance && checkoutJsInstance.onLoad) {
      checkoutJsInstance.onLoad(() => {
        this.initializeCheckout(checkoutJsInstance);
      });
    }
  }

  private initializeCheckout = (checkoutJsInstance): void => {
    checkoutJsInstance
      .init({
        ...this.config,
        root: this.openInPopup ? '' : `#${this.checkoutJsContainerId}`
      })
      .then(_ => {
        this.checkoutJsInstanceSource$.next(checkoutJsInstance);
      })
      .catch((error) => {
        console.error(CONSTANTS.ERRORS.INIT, error);
      });
  }

  private getCheckoutJsObj(): CheckoutInstance | null {
    const window = this.window;

    if (window && window.Paytm && window.Paytm.CheckoutJS) {
      return window.Paytm.CheckoutJS;
    } else {
      console.warn(CONSTANTS.ERRORS.CHECKOUT_NOT_AVAILABLE);
    }

    return null;
  }

  ngOnDestroy(): void {
    this.checkoutJsInstanceSource$.complete();
  }
}
