import React from 'react';
import '../Styles/Button.css';

function Button({ title, backgroundColor }: any) {
  return (
    <button type="button" style={{ backgroundColor }} className="button">{title}</button>
  )
}

export default Button;
