import React, { useContext, useEffect, useReducer } from 'react';
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';
import { Store } from '../store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import getError from '../utils';
import { Helmet } from 'react-helmet';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const Order = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate('/signin');
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [navigate, order, orderId, userInfo]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="alert-danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <div className="container">
        <h1 className="my-3">Order {orderId}</h1>
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3 bg-dark">
              <div className="card-body">
                <div className="card-title">Shipping</div>
                <div className="card-text">
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Phone Number:</strong> {order.shippingAddress.number}{' '}
                  <br />
                  <strong>Address:</strong> {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city}
                </div>
                {order.isDelivered ? (
                  <MessageBox variant="alert-success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="alert-danger">Not Delivered</MessageBox>
                )}
              </div>
            </div>
            <div className="card mb-3 bg-dark">
              <div className="card-body">
                <div className="card-title">Payment</div>
                <div className="card-text">
                  <strong>Method:</strong> {order.paymentMethod}
                </div>
                {order.isPaid ? (
                  <MessageBox variant="alert-success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="alert-danger">Not Paid</MessageBox>
                )}
              </div>
            </div>
            <div className="card mb-3 bg-dark">
              <div className="card-body">
                <div className="card-title">Items</div>
                <ul className="list-group list-group-flush">
                  {order.orderItems.map((item) => (
                    <li
                      key={item._id}
                      className="list-group-item bg-dark text-white"
                    >
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <img
                            src={item.img}
                            alt={item.prodname}
                            className="img-fluid rounded img-thumbnail"
                          />{' '}
                          <Link
                            className="text-decoration-none text-white"
                            to={`/product/${item.slug}`}
                          >
                            {item.prodname}
                          </Link>
                        </div>
                        <div className="col-md-3">
                          <span>{item.quantity}</span>
                        </div>
                        <div className="col-md-3">Rs {item.price}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-3 bg-dark">
              <div className="card-body">
                <div className="card-title">Order Summary</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-dark text-white">
                    <div className="row">
                      <div className="col">Items</div>
                      <div className="col">
                        Rs {order.itemsPrice.toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item bg-dark text-white">
                    <div className="row">
                      <div className="col">Shipping</div>
                      <div className="col">
                        Rs {order.shippingPrice.toFixed(2)}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item  bg-dark text-white">
                    <div className="row">
                      <div className="col">Tax</div>
                      <div className="col">Rs {order.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li className="list-group-item bg-dark text-white">
                    <div className="row">
                      <div className="col">
                        <strong>Order Total</strong>
                      </div>
                      <div className="col">
                        <strong>Rs {order.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>
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

export default Order;
