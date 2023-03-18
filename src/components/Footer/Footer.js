import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';


export const Footer = ({ children }) => {
  return <div className="bg-gray-custom  border-t-8">
    <div className="container mx-auto px-4   py-10 ">
      <div className="flex flex-col items-center space-y-4">
      <div className="pixel  text-primary pb-10">Gamebit</div>
      <p className="navbar-font-family text-4xl">Find us On</p>
      <div className="flex justify-center space-x-6">
    <FontAwesomeIcon className="text-2xl"  icon={faFacebook} />
    <FontAwesomeIcon className="text-2xl" icon={faInstagram} />
    <FontAwesomeIcon className="text-2xl" icon={faYoutube} />
    <FontAwesomeIcon className="text-2xl" icon={faTwitter} />
    </div>
    

    <div className="flex navbar-font-family space-x-2 pt-10">
      <div>About</div>
      <div>|</div>
      <div>Advertise</div>
      <div>|</div>
      <div>About</div>
      <div>|</div>
      <div>Advertise</div>
    </div>
    
    <div className="text-sm text-gray-300 ">ⓒ Gamebit 2023</div>
    </div>
    </div>
  </div>;
}