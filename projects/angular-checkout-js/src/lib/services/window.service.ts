import { InjectionToken } from '@angular/core';
import { CheckoutInstance } from './../interfaces';

export interface Window {
    Paytm?: {
        CheckoutJS?: CheckoutInstance
    };
}

export const WINDOW_TOKEN = new InjectionToken<Window>('Window', {
    providedIn: 'root',
    factory: () => window as Window
});