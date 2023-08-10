import React from 'react'
import '../Styles/Landing.css';
import Button from './Button';

function PricingCard({
  title, description, fee, included,
}: {title: string; description: string; fee: string; included: string[]}) {
  return (
    <div className="pricing_card_container">
      <h2>{title}</h2>
      <div className="pricing_card_description">
        <h4>{description}</h4>
      </div>
      <h2>{fee}</h2>
      <Button title="Sign up" backgroundColor="#20A4F3" width="100%" />
      <hr className="button_line" />
      <h4>Whats included?</h4>
      {included.map((el) => (
        <h4 className="checkmark">{el}</h4>
      ))}
    </div>
  )
}

export default PricingCard;
