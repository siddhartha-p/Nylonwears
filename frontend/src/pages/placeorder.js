import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/checkoutSteps';
import { Store } from '../store';
import getError from '../utils';
import { toast } from 'react-toastify';
import Axios from 'axios';
import LoadingBox from '../components/loadingbox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 2000 ? round2(0) : round2(100);
  cart.taxPrice = round2(0.13 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);
  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <div className="container p-4">
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      </div>
      <div className="container">
        <h1 className="my-3">Preview Order</h1>
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3 bg-dark">
              <div className="card-body">
                <div className="card-title">Shipping</div>
                <div className="card-text">
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Phone Number:</strong> {cart.shippingAddress.number}{' '}
                  <br />
                  <strong>Address:</strong> {cart.shippingAddress.address},{' '}
                  {cart.shippingAddress.city}
                </div>
                <Link
                  to="/shipping"
                  className="btn"
                  style={{ backgroundColor: '#ff523b', color: 'white' }}
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className="card mb-3 bg-dark">
              <div className="card-body">
                <div className="card-title">Payment</div>
                <div className="card-text">
                  <strong>Method:</strong> {cart.paymentMethod}
                </div>
                <Link
                  to="/payment"
                  className="btn"
                  style={{ backgroundColor: '#ff523b', color: 'white' }}
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className="card mb-3 bg-dark">
              <div className="card-body">
                <div className="card-title">Items</div>
                <ul className="list-group list-group-flush mb-3">
                  {cart.cartItems.map((item) => (
                    <li className="list-group-item bg-dark" key={item._id}>
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <img
                            src={item.img}
                            alt={item.prodname}
                            className="img-fluid rounded img-thumbnail"
                          />{' '}
                          <Link
                            to={`/product/${item.slug}`}
                            className="text-decoration-none text-white"
                          >
                            {item.prodname}
                          </Link>
                        </div>
                        <div className="col-md-3 text-white">
                          <span>{item.quantity}</span>
                        </div>
                        <div className="col-md-3 text-white">
                          Rs {item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/cart"
                  className="btn"
                  style={{ backgroundColor: '#ff523b', color: 'white' }}
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark">
              <div className="card-body">
                <div className="card-title">Order Summary</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-dark">
                    <div className="row">
                      <div className="col text-white">Items</div>
                      <div className="col text-white">
                        Rs {cart.itemsPrice.toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item bg-dark">
                    <div className="row">
                      <div className="col text-white">Shipping</div>
                      <div className="col text-white">
                        Rs {cart.shippingPrice.toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item bg-dark">
                    <div className="row">
                      <div className="col text-white">Tax</div>
                      <div className="col text-white">
                        Rs {cart.taxPrice.toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item bg-dark">
                    <div className="row">
                      <div className="col text-white">
                        <strong>Order Total</strong>
                      </div>
                      <div className="col text-white">
                        <strong>Rs {cart.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item bg-dark">
                    <div className="d-grid">
                      <button
                        className="btn"
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                        style={{ backgroundColor: '#ff523b', color: 'white' }}
                      >
                        Place Order
                      </button>
                    </div>
                    {loading && <LoadingBox />}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
