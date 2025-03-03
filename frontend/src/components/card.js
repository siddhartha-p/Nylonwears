import * as React from 'react';
import { useEffect, useReducer } from 'react';
import '../components/css/card.css';
import axios from 'axios';
import logger from 'use-reducer-logger';
import LoadingBox from './loadingbox';
import MessageBox from './messagebox';
import RenderCard from './rendercard';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Card = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    products: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const addToCartHandler = () => {
  //   ctxDispatch({
  //     type: 'CART_ADD_ITEM',
  //     payload: { ...products, quantity: 1 },
  //   });
  // };

  return (
    <div id="Featured" className={`container pt-lg-4  px-0`}>
      {/* <!--Featured Products--> */}
      <div className="row m-auto">
        <div className="col">
          <h2 className={`title`}>Products</h2>
        </div>
      </div>
      <div
        id="featured"
        className="shop row products justify-content-center px-lg-5 mx-lg-5"
      >
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="alert-danger">{error}</MessageBox>
        ) : (
          products.map((product) => (
            <div
              className={`col-sm-6 col-md-4 col-lg-3 col mb-3`}
              key={product.slug}
            >
              <RenderCard carddata={product} />
            </div>
          ))
        )}
      </div>
      {/* <!--Featured Products End--> */}
    </div>
  );
};

export default Card;
