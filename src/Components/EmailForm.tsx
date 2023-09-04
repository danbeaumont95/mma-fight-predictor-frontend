import React, { useState } from 'react';
import { handleCheckout } from '../Helpers/stripe';
import '../Styles/EmailForm.css';

interface EmailFormProps {
  fee: string;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

// eslint-disable-next-line react/function-component-definition
const EmailForm: React.FC<EmailFormProps> = (props) => {
  const { fee, setShowForm } = props;
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCheckout({ fee, email })
  };

  return (
    <div className="form_container">
      <span className="close-icon" onClick={() => setShowForm(false)}>x</span>
      <h2>Proceed to payment page</h2>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="btn-submit">Submit</button>
      </form>
    </div>
  );
};

export default EmailForm;
