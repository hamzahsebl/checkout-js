import React, { FunctionComponent } from 'react';
import { configurePartiallyButton } from './../../../../../../scripts/custom/partially';

import { CheckoutContextProps, withCheckout } from '../../checkout';
import HostedPaymentMethod, { HostedPaymentMethodProps } from './HostedPaymentMethod';
import { PaymentMethodProps } from './PaymentMethod';
import { EMPTY_ARRAY } from '../../common/utility';
import PaymentMethodProviderType from './PaymentMethodProviderType';

export type PartiallyPaymentMethodProps = HostedPaymentMethodProps;

interface WithCheckoutPartiallyPaymentMethodPaymentMethodProps {
      isHostedPayment: boolean;
}

const PartiallyPaymentMethod: FunctionComponent<PartiallyPaymentMethodProps &
WithCheckoutPartiallyPaymentMethodPaymentMethodProps>  = ({
      isHostedPayment
  }) => {
      configurePartiallyButton.call(isHostedPayment);

      // useEffect(() => {
      //       const initializePayment = async () => {
      //           try {
      //                   //hidePaymentSubmitButton(method, true);
      //                   var c = await checkoutService.loadCheckout();
      //                   const cart = getCart();
      //                   await configurePartiallyButton.call(c.data.getCart()?.lineItems);
                    
      //           } catch (error) {
      //               //onUnhandledError("Failed to load payment merchant");
      //           }
      //       };
      //       initializePayment();
      //   }, [method, onUnhandledError]);
    
      
              return (
                      <div id="partiallyCartButtonContainer"></div>
                );

    
};

function mapToPartiallyPaymentMethodProps(
      { checkoutState }: CheckoutContextProps,
      { method }: PaymentMethodProps
  ): WithCheckoutPartiallyPaymentMethodPaymentMethodProps {
      const { data: { getCheckout } } = checkoutState;
    const { payments = EMPTY_ARRAY } = getCheckout() || {};
    const selectedHostedMethod = payments.find(({ providerType }) => providerType === PaymentMethodProviderType.Hosted);

    return {
        isHostedPayment: selectedHostedMethod ?
            selectedHostedMethod.providerId === method.id && selectedHostedMethod.gatewayId === method.gateway :
            false,
    };
  }


export default withCheckout(mapToPartiallyPaymentMethodProps)(PartiallyPaymentMethod);