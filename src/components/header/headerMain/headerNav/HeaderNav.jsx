import React from 'react';
import { Link } from 'react-router-dom';
import './headerNav.scss';

function HeaderNav() {
  return (
    <nav className="headerNav">
      <ul className="headerNav__inner">
        <li className="headerNav__item">
          <a href="" className="headerNav__link">
            Home
          </a>
        </li>
        <li className="headerNav__item">
          <Link to="/" className="headerNav__link">
            Products
          </Link>
        </li>
        <li className="headerNav__item">
          <Link to="" className="headerNav__link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
