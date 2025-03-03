import React from 'react';
import './css/checkoutsteps.css';

function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={`col ${props.step1 ? 'active' : ''}`}>Log In</div>
      <div className={`col ${props.step2 ? 'active' : ''}`}>Shipping</div>
      <div className={`col ${props.step3 ? 'active' : ''}`}>Payment</div>
      <div className={`col ${props.step4 ? 'active' : ''}`}>Place Order</div>
    </div>
  );
}

export default CheckoutSteps;
