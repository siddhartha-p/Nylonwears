import '../components/css/login.css';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../store';
import { toast } from 'react-toastify';
import getError from '../utils';

function SignIn() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="container d-flex justify-content-center p-5" id="login">
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <div className="col-lg-6 bg-dark rounded">
        <div className="login_screen m-3 mt-5 pb-3">
          <h1 className="text-white">WEAR THE BEST CLOTHES</h1>
          <form method="post" onSubmit={submitHandler}>
            <div className={`txt_field`}>
              <input
                className="text-white"
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <span></span>
              <label className="text-white">EMAIL ADDRESS</label>
            </div>
            <div className="txt_field">
              <input
                className="text-white"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span></span>
              <label className="text-white">PASSWORD</label>
            </div>
            {/* <div className="pass text-end text-white">Forgot Password?</div> */}
            <input className="mt-4 text-white" type="submit" value="Login" />
            <div className="signup_link mt-4 text-white">
              Don't have an account?{' '}
              <Link to={`/signup?redirect=${redirect}`}>Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
