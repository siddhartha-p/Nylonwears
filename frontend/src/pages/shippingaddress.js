import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/checkoutSteps';
import { Store } from '../store';

function ShippingAddress() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [number, setNumber] = useState(shippingAddress.number || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  useEffect(() => {
    if (!userInfo) navigate('/signin?redirect=/shipping');
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, number, address, city },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ fullName, number, address, city })
    );
    navigate('/payment');
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <div className="container p-4 col-lg-5">
        <CheckoutSteps step1 step2></CheckoutSteps>
      </div>
      <div className="container col-lg-5">
        <h1 className="my-3">Shipping Address</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3" controlId="fullName">
            <label for="fullName" className="form-label">
              Full Name
            </label>
            <input
              value={fullName}
              className="form-control"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" controlId="number">
            <label for="number" className="form-label">
              Phone Number
            </label>
            <input
              value={number}
              className="form-control"
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" controlId="address">
            <label for="address" className="form-label">
              Address
            </label>
            <input
              value={address}
              className="form-control"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" controlId="city">
            <label for="city" className="form-label">
              City
            </label>
            <input
              value={city}
              className="form-control"
              onChange={(e) => setCity(e.target.value)}
              required
            />
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
}

export default ShippingAddress;
