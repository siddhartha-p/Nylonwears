import axios from 'axios';
import React, { useContext } from 'react';
import { Store } from '../store';
import Rating from './rating';

const RenderCard = (props) => {
  const { carddata } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === carddata._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.stock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <div
      className={`card text-center align-items-center text-bg-dark`}
      key={carddata.slug}
    >
      <div>
        <a className="text-decoration-none" href={`product/${carddata.slug}`}>
          <div
            className={`container d-flex align-items-center justify-content-center`}
          >
            <img
              src={carddata.img}
              className="card-img-top"
              alt={carddata.prodname}
            />
          </div>
        </a>
        <div className="card-body">
          <a className="text-decoration-none" href={`product/${carddata.slug}`}>
            <h6 className="card-title text-white">{carddata.prodname}</h6>
            <span className="card-text">
              <Rating
                rating={carddata.rating}
                numReviews={carddata.numReviews}
              />
            </span>
          </a>
          {/* add to cart */}
          Rs {carddata.price}
          {/* <div className="buttons d-flex gap-3 justify-content-center align-items-center">
                    <i onclick="decrement(${id}), generateCartItems()" className={`${bi} btn py-0 px-1 text-white bi bi-dash-lg`} role="button"></i>
                      <div className="quantity text-white">${search.item}</div>
                    <i onclick="increment(${id}), generateCartItems()" className={`${bi} btn py-0 px-1 text-white bi bi-plus-lg`} role="button"></i>
                  </div> */}
        </div>
      </div>
      <div className={`card-footer border-0 d-flex flex-column`}>
        <div>
          {carddata.stock === 0 ? (
            <button
              className="btn btn-outline-light btn-sm cardfooter"
              disabled
            >
              Out of Stock
            </button>
          ) : (
            <button
              className="btn btn-outline-light btn-sm cardfooter"
              onClick={() => {
                addToCartHandler(carddata);
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderCard;
