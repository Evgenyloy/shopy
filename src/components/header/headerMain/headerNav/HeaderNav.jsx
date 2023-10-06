import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './headerNav.scss';

function HeaderNav({ handleClick }) {
  return (
    <nav className="headerNav">
      <ul className="headerNav__inner">
        <li className="headerNav__item">
          <NavLink
            exact
            to="/"
            className={(isActive) =>
              'headerNav__link' + (!isActive ? ' unselected' : ' red')
            }
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li>

        <li className="headerNav__item">
          <NavLink
            exact
            to="/products"
            className={(isActive) =>
              'headerNav__link' + (!isActive ? ' unselected' : ' red')
            }
            onClick={handleClick}
          >
            Products
          </NavLink>
        </li>
        <li className="headerNav__item">
          <NavLink
            exact
            to="/about"
            onClick={handleClick}
            className={(isActive) =>
              'headerNav__link' + (!isActive ? ' unselected' : ' red')
            }
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
