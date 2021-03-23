import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import CONSTANTS from '../constants';
import { WINDOW_TOKEN, Window } from './window.service';
import { ReplaySubject } from 'rxjs';
import { ICheckoutInstance, CheckoutOptions, Env , ICheckoutOptions} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements OnDestroy {
  private config: any;
  private openInPopup = true;
  private isScriptLoaded = false;
  private isScriptLoading = false;
  private receivedCheckoutJsInstance: ICheckoutInstance;
  readonly checkoutJsContainerId = CONSTANTS.IDS.CHECKOUT_ELEMENT + (new Date()).getTime();

  private readonly checkoutJsInstanceSource$ = new ReplaySubject<ICheckoutInstance>(1);
  readonly checkoutJsInstance$ = this.checkoutJsInstanceSource$.asObservable();

  constructor(
    @Inject(WINDOW_TOKEN) private readonly window: Window,
    @Inject(DOCUMENT) private readonly document: any) {
  }

  init(config: any, options?: ICheckoutOptions): void {
    options = CheckoutOptions.from(options);

    const merchantId = config && config.merchant && config.merchant.mid;

    if (merchantId) {
      const prevMerchantId = this.config && this.config.merchant && this.config.merchant.mid;
      this.config = config;
      this.openInPopup = options.openInPopup;

      if (options.checkoutJsInstance) {
        this.receivedCheckoutJsInstance = options.checkoutJsInstance;
        this.checkoutJsInstanceSource$.next(options.checkoutJsInstance);
      }

      if ((options.checkoutJsInstance || this.isScriptLoaded) && merchantId === prevMerchantId) {
        this.initializeCheckout();
      }
      else if (!this.isScriptLoading || (prevMerchantId && merchantId !== prevMerchantId)) {
        this.loadCheckoutScript(merchantId, options.env);
      }

    } else {
      console.error(CONSTANTS.ERRORS.MERCHANT_ID_NOT_FOUND);
    }
  }

  private loadCheckoutScript(merchantId: string, env: Env): void {
    this.isScriptLoaded = false;
    this.isScriptLoading = true;
    const scriptElement = this.document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = CONSTANTS.HOSTS[env] + CONSTANTS.LINKS.CHECKOUT_JS_URL.concat(merchantId);
    scriptElement.type = 'application/javascript';
    scriptElement.onload = this.setupCheckoutJs;
    scriptElement.onError = () => {
      this.isScriptLoading = false;
    };
    this.document.body.appendChild(scriptElement);
  }

  private setupCheckoutJs = (): void => {
    const checkoutJsInstance = this.getCheckoutJsObj();

    if (checkoutJsInstance && checkoutJsInstance.onLoad) {
      checkoutJsInstance.onLoad(() => {
        this.isScriptLoaded = true;
        this.isScriptLoading = false;
        this.initializeCheckout();
      });
    }
  }

  private initializeCheckout = (): void => {
    const checkoutJsInstance = this.getCheckoutJsObj();

    if (checkoutJsInstance && checkoutJsInstance.init && checkoutJsInstance.invoke) {
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
    } else {
      console.error(CONSTANTS.ERRORS.INVALID_CHECKOUT_JS_INSTANCE);
    }
  }

  private getCheckoutJsObj(): ICheckoutInstance | null {
    const window = this.window;

    if (this.receivedCheckoutJsInstance) {
      return this.receivedCheckoutJsInstance;
    }

    if (window && window.Paytm && window.Paytm.CheckoutJS) {
      return window.Paytm.CheckoutJS;
    }

    console.warn(CONSTANTS.ERRORS.CHECKOUT_NOT_AVAILABLE);
    return null;
  }

  ngOnDestroy(): void {
    this.checkoutJsInstanceSource$.complete();
  }
}
