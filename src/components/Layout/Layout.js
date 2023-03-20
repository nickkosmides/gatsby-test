import React from "react";
import { Menu } from '../Menu';
import { Footer } from "../Footer";
import { Link } from "gatsby";
// import {AdSense} from '../AdSense';
export const Layout = ({ children }) => {
  return <div className=""><Menu/>{children}<Footer/></div>;
}