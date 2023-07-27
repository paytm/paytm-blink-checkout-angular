import CONSTANTS from "../constants";

interface IStringDictionary {
    [key: string]: string
}

export interface ICheckoutInstance {
    onLoad?: (fn: Function) => void,
    init?: (config: any) => Promise<any>,
    close?: () => void,
    invoke?: () => void,
    initLib?: (merchantId: string) => Promise<any>,
    PAYMODE?: IStringDictionary,
    FLOW?: IStringDictionary,
    TOKEN?: IStringDictionary,
    DEFERRED_EVENTS?: IStringDictionary,
    NOTIFY_MERCHANT_EVENTS?: IStringDictionary
}

export type Env = 'STAGE' | 'PROD';


export class ICheckoutOptions {
    env?: Env;
    openInPopup?: boolean;
    checkoutJsInstance?: ICheckoutInstance;
}

export class CheckoutOptions implements ICheckoutOptions{
    public constructor(
        public env: Env,
        public openInPopup?: boolean,
        public checkoutJsInstance?: ICheckoutInstance,
    ) {
    }

    static from(options : ICheckoutOptions): CheckoutOptions{
        options = options || {};
        const env = options.env || <Env>CONSTANTS.ENV.PROD;
        const openInPopup = typeof options.openInPopup === 'boolean' ? options.openInPopup : true;
        
        return new CheckoutOptions(
            env,
            openInPopup,
            options.checkoutJsInstance
        );
    }
}