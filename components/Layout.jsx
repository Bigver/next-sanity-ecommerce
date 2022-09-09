import React from 'react';
import Head from 'next/head';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>SHOP-IPHONE</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
        <MessengerCustomerChat
          pageId="100705109461262"
          appId="1733360910357015"
        />,
      </main>
      <footer>
        <Footer />
      </footer>
      ,
    </div>
  )
}

export default Layout