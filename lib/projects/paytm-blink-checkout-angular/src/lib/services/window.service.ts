import { InjectionToken } from '@angular/core';
import { ICheckoutInstance } from '../models';

export interface Window {
    Paytm?: {
        CheckoutJS?: ICheckoutInstance
    };
}

export const WINDOW_TOKEN = new InjectionToken<Window>('Window', {
    providedIn: 'root',
    factory: () => window as Window
});