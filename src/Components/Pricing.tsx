import React from 'react';
import PricingCard from './PricingCard';
import { pricingCards } from '../Helpers/constants';
import '../Styles/Pricing.css';

function Pricing() {
  return (
    <div className="pricing_container">

      <div className="pricing_cards_containers">
        {pricingCards.map((el) => (
          <PricingCard
            title={el.title}
            description={el.description}
            fee={el.fee}
            included={el.included}
          />
        ))}
      </div>
    </div>
  )
}

export default Pricing;
