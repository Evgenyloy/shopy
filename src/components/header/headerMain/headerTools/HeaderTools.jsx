import { useEffect, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { AiFillHeart } from 'react-icons/ai';
import { SlLogin, SlLogout } from 'react-icons/sl';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { removeUser } from '../../../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import './headerTools.scss';
import { useAuth } from '../../../../hooks/use-auth';

function HeaderTools() {
  const dispatch = useDispatch();
  const [inputVisibility, setInputVisibility] = useState(false);
  const { email, orders, favorites, isAuth } = useAuth();

  const onItemClick = () => {
    setInputVisibility(!inputVisibility);
  };

  useEffect(() => {
    if (inputVisibility) {
      document.querySelector('.header-tools__input').focus();
    }
  }, [inputVisibility]);

  return (
    <div className="header-tools">
      {inputVisibility ? <Input /> : null}
      <div className="header-tools__item" onClick={onItemClick}>
        <PiMagnifyingGlass />
      </div>
      <Link
        to={'/basket'}
        className="header-tools__item header-tools__item-basket"
      >
        <PiShoppingCartSimpleBold />
        <span className=" header-tools__item-span">
          {orders.length > 0 && orders.length}
        </span>
      </Link>
      <Link
        to="/favorites"
        className="header-tools__item header-tools__item-favorites"
      >
        <AiFillHeart />
        <span className=" header-tools__items">
          {favorites.length > 0 && favorites.length}
        </span>
      </Link>
      {isAuth ? (
        <div
          className="header-tools__item"
          onClick={() => dispatch(removeUser())}
        >
          <SlLogout />
        </div>
      ) : (
        <Link to="/login" className="header-tools__item">
          <SlLogin />
        </Link>
      )}

      <p className="header-tools__user">
        {email ? email : <LinkTo />}
        {/*  {email && <Button dispatch={dispatch} />} */}
      </p>
    </div>
  );
}

const LinkTo = () => {
  return <Link to="/login"></Link>;
};

const Input = () => {
  return <input className="header-tools__input" type="text" />;
};

export default HeaderTools;
