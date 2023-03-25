import React from "react";
import { Menu } from '../Menu';
import { Helmet } from 'react-helmet';
import { Footer } from "../Footer";
import { Link } from "gatsby";
// import {AdSense} from '../AdSense';
export const Layout = ({ children }) => {
  return <div className="">
      <Helmet>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9889741061727429"
     crossorigin="anonymous"></script>      </Helmet>
    <Menu/>{children}<Footer/></div>;
}
