const CONSTANTS = {
    PROJECT_NAME: 'Paytm Blink Checkout JS',
    ENV: {
        PROD: 'PROD',
        STAGE: 'STAGE'
    },
    HOSTS: {
        PROD: 'https://secure.paytmpayments.com',
        STAGE: 'https://securestage.paytmpayments.com'
    },
    LINKS: {
        CHECKOUT_JS_URL: '/merchantpgpui/checkoutjs/merchants/'
    },
    ERRORS: {
        INIT : 'An error during initialization!',
        INVOKE : 'An error during invoking!',
        MERCHANT_ID_NOT_FOUND: 'Please provide merchant id!',
        CHECKOUT_NOT_AVAILABLE: 'Checkout JS library not found. Please make sure you have included checkout js!',
        INVALID_CHECKOUT_JS_INSTANCE: 'Invalid instance provided!'
    },
    IDS: {
        CHECKOUT_ELEMENT: 'checkout-wrapper-'
    }
};

// Prefix error with project name
Object.keys(CONSTANTS.ERRORS).forEach(errorCode=>{
    (CONSTANTS.ERRORS as any)[errorCode] = `${CONSTANTS.PROJECT_NAME}: ${(CONSTANTS.ERRORS as any)[errorCode]}`;
});

export default CONSTANTS;
