import React from "react";
import { Menu } from '../Menu';
import { Footer } from "../Footer";
import { Link } from "gatsby";

export const Layout = ({ children }) => {
  return <div className=""><Link to="/" className="">Home</Link>{children}<Footer/></div>;
}