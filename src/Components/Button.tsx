import React from 'react';
import '../Styles/Button.css';

function Button({ title, backgroundColor, width }: any) {
  return (
    <button type="button" style={{ backgroundColor, width }} className="button">{title}</button>
  )
}

export default Button;
