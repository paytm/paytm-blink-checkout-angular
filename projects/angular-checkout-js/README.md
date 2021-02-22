# paytm-blink-checkout-angular

## Installation
```sh
$ npm install --save paytm-blink-checkout-angular
```

## Supported Angular versions
6 and above

## Usage
The paytm-blink-checkout-angular provides a module, component and service to incorporate Paytm Blink Checkout JS library in a project. 

In order to make use of **paytm-blink-checkout-angular**, import CheckoutModule to the modules imports section. 

#### Example

```javascript
import { CheckoutModule } from 'paytm-blink-checkout-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CheckoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### CheckoutService
The service provide methods for setting up Paytm Blink Checkout JS in a project. It sets the Paytm Blink JS instance, which could be retrieved from checkoutJsInstance$ observable from the service.  To initialize, one need to call service init method with config and optional openInPopup boolean value. The **config** argument is mandatory to be passed in order to initialize Paytm React Checkout JS library. 
In options (optional second argument) following could be passed:  
1. openInPopup (optional): To show checkout in popup or not, by default it's value is true.
2. env (optional): To load Paytm Blink Checkout JS from 'STAGE' or 'PROD' env, by default it's value is 'PROD'.
3. checkoutJsInstance (optional): To use existing checkoutjs instance.


The  config should be of same format as the  Paytm Blink Checkout JS library, which could be checked from this [link](https://staticpg.paytm.in/checkoutjs/21/docs/#/configuration).

#### Example
Service could be injected and initialized as follows :

```javascript

import { Component, OnDestroy } from '@angular/core';
import { CheckoutService } from 'paytm-blink-checkout-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template: ''
})
export class AppComponent implements OnDestroy{
  private subs: Subscription;

  constructor(private readonly checkoutService: CheckoutService) {
    this.checkoutService.init(
      //config
      {
        data: {
          orderId: "test4",
          amount: "3337",
          token: "e334366c509b4294a285a3b42a5659ea1584106015734",
          tokenType: "TXN_TOKEN"
        },
        merchant: {
          mid: "wHNUTH68224456779429",
          name: "Dummy",
          redirect: true
        },
        flow: "DEFAULT",
        handler: {
          notifyMerchant: this.notifyMerchantHandler
        }
      },
      //options
      {
        env: 'PROD', // optional, possible values : STAGE, PROD; default : PROD
        openInPopup: true // optional; default : true
      }
    );

    this.subs = this.checkoutService
      .checkoutJsInstance$
      .subscribe(instance=>console.log(instance));
  }

  notifyMerchantHandler = (eventType, data): void => {
    console.log('MERCHANT NOTIFY LOG', eventType, data);
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
```

###  CheckoutComponent
The component is responsible for invoking and displaying the payment page. **Please make sure to call CheckoutService service init method** . 

#### Example
```javascript
<paytm-checkout></paytm-checkout>
``` 