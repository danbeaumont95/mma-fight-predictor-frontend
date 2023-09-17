import React from 'react'
import '../Styles/Landing.css';

function PricingCard({
  title, description, fee, included, handleClick,
}: {title: string; description: string;
  // eslint-disable-next-line no-unused-vars
  fee: string; included: string[], handleClick: (fees: string) => void}) {
  return (
    <div className="pricing_card_container">
      <h2>{title}</h2>
      <div className="pricing_card_description">
        <h4>{description}</h4>
      </div>
      <h2>{fee}</h2>
      <button style={{ backgroundColor: '#20A4F3', width: '100%' }} className="button" type="button" onClick={() => handleClick(fee)}>Sign up</button>
      <hr className="button_line" />
      <h4>Whats included?</h4>
      {included.map((el) => (
        <h4 className="checkmark">{el}</h4>
      ))}
    </div>
  )
}

export default PricingCard;
