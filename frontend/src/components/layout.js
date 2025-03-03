import * as React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <div className="bg-black text-white min-vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar />
      </header>
      <main className="bg-black text-white">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
