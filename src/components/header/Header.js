import React from "react";
import "./header.scss";
import SearchBar from "../search/SearchBar";

const Header = () => (
  <nav role='navigation'>
    <div className='nav-wrapper container'>
      <div id='logo-container' className='brand-logo'>
        <img
          src='https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png'
          alt='logo'
          width='200'
        />
      </div>
      <div className='row'>
        <div className='col s6 offset-s6'>{<SearchBar />}</div>
      </div>
      <ul id='nav-mobile' className='sidenav'>
        <li>Navbar Link</li>
      </ul>
    </div>
  </nav>
);

export default Header;
