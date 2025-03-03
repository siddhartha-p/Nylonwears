import '../components/css/login.css';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../store';
import { toast } from 'react-toastify';
import getError from '../utils';

function SignUp() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
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
        <title>Sign Up</title>
      </Helmet>
      <div className="col-lg-6 bg-dark rounded">
        <div className="login_screen m-3 mt-5 pb-3">
          <h1 className="text-white">SIGN UP</h1>
          <form method="post" onSubmit={submitHandler}>
            <div className={`txt_field`}>
              <input
                className="text-white"
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <span></span>
              <label className="text-white">NAME</label>
            </div>
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
            <div className="txt_field">
              <input
                className="text-white"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span></span>
              <label className="text-white">CONFIRM PASSWORD</label>
            </div>
            <input className="mt-4 text-white" type="submit" value="Sign Up" />
            <div className="signup_link mt-4 text-white">
              Already have an account?{' '}
              <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
