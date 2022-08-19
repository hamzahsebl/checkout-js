export const configurePartiallyButton = (items) => {

    console.log(items);

    document.partiallyBtnConfig = {
        offer: 'ce3a249b-1929-4f99-84b6-7ab5e23978eb',
        amount: '100',
        returnUrl: '{{settings.secure_base_url}}/cart.php',
        cssButton: true,
        cssButtonText: 'Purchase with',
        cssButtonShowLogo: true,
        cssButtonLogoType: 'full',
        cssButtonLogoPlacement: 'after',
        renderSelector: '#partiallyCartButtonContainer',
    
        bigcommerceCartItems: items
    };

    (function() {
        var script = document.querySelector('script[src="https://partial.ly/js/partially-checkout-button.js"]');
        if (Boolean(script)){
            
            if (document.partiallyBtnConfig) {
                var btn = new PartiallyButton(document.partiallyBtnConfig);
                btn.init();
            }
            
        } else {
            LoadPartiallyScript();
        }
        
    })();
    
    function LoadPartiallyScript(){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://partial.ly/js/partially-checkout-button.js';
        script.async = true;
        document.head.appendChild(script);
    }
};
