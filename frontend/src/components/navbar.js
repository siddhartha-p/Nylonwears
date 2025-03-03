import * as React from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css';
import { useContext, useState, useEffect } from 'react';
import { Store } from '../store';
import getError from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import SearchBox from './searchbox';

const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/categories');
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    // Navigation Bar Start
    <nav className={`navbar navbar bg-dark text-white`}>
      <div className="container justify-content-around navbar-expand-lg flex-column flex-lg-row gap-1 gap-lg-auto">
        <div className="d-flex gap-1">
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list-ul"></i>
          </button>
          <Link to="/" className="navbar-brand text-uppercase text-white">
            NylonWears
          </Link>
        </div>
        <div className="navbar-expand-lg">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <SearchBox />
          </div>
        </div>
        <div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex gap-4 navbar-expand">
              <div className="navbar-nav me-auto">
                <div className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle text-white"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Products
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/search">
                        All Products
                      </Link>
                    </li>
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          className="dropdown-item"
                          to={`/search?category=${category}`}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="navbar-nav">
                <div className="nav-item">
                  <Link to="/contactus" className="nav-link text-white">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex gap-4 navbar-expand">
              <div className="navbar-nav">
                <div className="nav-item">
                  {userInfo ? (
                    <div className="nav-item dropdown">
                      <span
                        className="btn nav-link dropdown-toggle text-dark bg-white py-1 px-2"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {userInfo.name}
                        <i className="bi bi-person"></i>
                      </span>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            User Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/orderhistory">
                            Order History
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="#signout"
                            onClick={signoutHandler}
                          >
                            Log Out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link
                      to="/signin"
                      className="btn nav-link text-dark bg-white py-1 px-2"
                      type="button"
                    >
                      <i className="bi bi-person"></i>
                    </Link>
                  )}
                </div>
              </div>
              <div className="navbar-nav">
                <div className="nav-item">
                  <Link
                    to="/cart"
                    className="btn position-relative nav-link text-dark bg-white py-1 px-2"
                    type="button"
                  >
                    <i className="bi bi-cart"></i>
                    <div
                      id="cartAmount"
                      className={`cartAmount cartAmount position-absolute p-1`}
                    >
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Start */}

      {/* Login End */}
    </nav>
    // Navigation Bar End
  );
};

export default Navbar;
