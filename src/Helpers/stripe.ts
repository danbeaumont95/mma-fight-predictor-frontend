// eslint-disable-next-line import/extensions
import getStripe from './lib/getStripe';
import SecretService from '../Services/secrets';

const priceLookup: {[key: string]: number} = {
  '£5.00': 5,
  '£40.00': 40,
}

// eslint-disable-next-line import/prefer-default-export
export async function handleCheckout(props: {[key: string]: string}) {
  const { fee, email } = props;
  const { data: { price_id } } = await SecretService.getTestPriceId(priceLookup[fee])
  const { data: { publishing_id } } = await SecretService.getTestPublishingId()
  const stripe = await getStripe(publishing_id);

  const { error } = await stripe.redirectToCheckout({
    lineItems: [
      {
        price: price_id,
        quantity: 1,
      },
    ],
    // mode: 'subscription',
    mode: 'payment',
    successUrl: 'http://localhost:3000/success',
    cancelUrl: 'http://localhost:3000/',
    customerEmail: email,
  });
  console.warn(error.message);
}
