export const configurePartiallyButton = (lineItems, total, returnUrl, redirectUrl, offer) => {
    document.partiallyButtonConfig = {
        offer: offer,
        amount: total,
        returnUrl: `${returnUrl}`,
        returnConfirmedUrl: `${redirectUrl}`,
        cssButton: true,
        cssButtonText: 'Proceed to Spread the Cost with Partially',
        cssButtonShowLogo: false,
        cssButtonLogoType: 'full',
        cssButtonLogoPlacement: 'after',
        renderSelector: '#partiallyCartButtonContainer',
        cssButtonCustomBg: '#14CCAD',
        bigcommerceCartItems: lineItems
    };

    (function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://partial.ly/js/partially-checkout-button.js';
        script.async = true;
        document.head.appendChild(script);
    })();
};