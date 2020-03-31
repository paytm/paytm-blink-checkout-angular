interface StringDictionary {
    [key: string]: string
}

export interface CheckoutInstance {
    onLoad?: (fn: Function) => void,
    init?: (config: any) => Promise<any>,
    close?: () => void,
    initLib?: (merchantId: string) => Promise<any>,
    PAYMODE?: StringDictionary,
    FLOW?: StringDictionary,
    TOKEN?: StringDictionary,
    DEFERRED_EVENTS?: StringDictionary,
    NOTIFY_MERCHANT_EVENTS?: StringDictionary
}