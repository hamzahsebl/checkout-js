import React, { Component, ReactNode } from 'react';
import { configurePartiallyButton } from './../../../../../../scripts/custom/partially';
import { CheckoutContextProps, withCheckout } from '../../checkout';
import { Checkout, PaymentMethod } from '@bigcommerce/checkout-sdk';
import { PaymentFormValues } from '@bigcommerce/checkout/payment-integration-api';
import { ConnectFormikProps, connectFormik } from '../../common/form';
import { MapToPropsFactory } from '../../common/hoc';
import { WithLanguageProps, withLanguage } from '../../locale';
import withPayment, { WithPaymentProps } from '../withPayment';
import { noop } from 'lodash';

export interface HostedPaymentMethodProps {
  method: PaymentMethod;
  onUnhandledError?(error: Error): void;
}

interface WithCheckoutHostedPaymentMethodProps {
  checkout: Checkout | undefined;
}

class PartiallyPaymentMethod extends Component<
      HostedPaymentMethodProps &
      WithCheckoutHostedPaymentMethodProps &
      WithPaymentProps &
      WithLanguageProps &
      ConnectFormikProps<PaymentFormValues>
> {
  async componentDidMount(): Promise<void> {
      const {
          method,
          checkout,
          onUnhandledError = noop
      } = this.props;

      try {
            if (checkout && method){
                var offer = '254ac2f3-edf2-49b2-9cf4-bccb43731d45';
                var lineItems = checkout?.cart.lineItems.physicalItems;
                var total = checkout.grandTotal;

                configurePartiallyButton(lineItems, total, method.config.returnUrl, method.config.redirectUrl, offer);

            } else {
                throw new Error();
            }
      } catch (error) {
          onUnhandledError("Failed to load partial.ly, please try again later.");
      }
  }

  render(): ReactNode {
      const {
      } = this.props;

      return (
        <div id="partiallyCartButtonContainer"></div>
      );
  }
}

const mapFromCheckoutProps: MapToPropsFactory<
  CheckoutContextProps,
  WithCheckoutHostedPaymentMethodProps,
  HostedPaymentMethodProps & ConnectFormikProps<PaymentFormValues>
> = () => {
  return (context, props) => {
      const {
        method
      } = props;

      const { checkoutState } = context;

      const {
          data: {
              getCheckout
          },
      } = checkoutState;

      const checkout = getCheckout();

      return {
          checkout: checkout,
          method: method
      };
  };
};

export default connectFormik(withLanguage(withPayment(withCheckout(mapFromCheckoutProps)(PartiallyPaymentMethod))));