import React from "react";
import { Menu } from '../Menu';
import { Footer } from "../Footer";
import { Link } from "gatsby";
import { Helmet } from 'react-helmet'
import GoogleAnalytics from "../GoogleAnalytics/GoogleAnalytics";
// import {AdSense} from '../AdSense';
export const Layout = ({ children }) => {
  return <div className="">
    <Helmet>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NR7DHTPH59"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NR7DHTPH59');
</script>

    </Helmet>
    <Menu/><Link to="/">Home</Link>{children}<Footer/></div>;
}