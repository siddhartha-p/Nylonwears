import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/checkoutSteps';
import { Store } from '../store';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'CashOnDelivery'
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxdispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <div className="container p-4 col-lg-5">
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
      </div>
      <div className="container col-lg-5">
        <h1 className="my-3">Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div class="form-check mb-3">
            <input
              class="form-check-input"
              type="radio"
              name="CashOnDelivery"
              id="CashOnDelivery"
              value="CashOnDelivery"
              checked={paymentMethodName === 'CashOnDelivery'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label class="form-check-label" for="CashOnDelivery">
              Cash On Delivery
            </label>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: '#ff523b', color: 'white' }}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
