import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePopUp } from '../../store/slices/popupSlice';
import { useState } from 'react';
import Logo from '../logo/Logo';

import './popup.scss';

const Popup = () => {
  const popupVisible = useSelector((state) => state.popup.popupVisible);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(changePopUp(false));
  };

  const changeBodyScroll = () => {
    if (popupVisible) {
      document.body.classList.add('noscroll');
    }
    if (!popupVisible) {
      document.body.classList.remove('noscroll');
    }
  };

  useEffect(() => {
    changeBodyScroll();
  }, [popupVisible]);

  const [windowIsOpen, setWindowIsOpen] = useState(false);

  const closePopup = () => {
    if (window.innerWidth > 650) {
      setWindowIsOpen(true);
    }
    if (window.innerWidth < 650) {
      setWindowIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', closePopup);
    return () => window.removeEventListener('resize', closePopup);
  }, []);

  useEffect(() => {
    if (!popupVisible) return;
    if (windowIsOpen) {
      dispatch(changePopUp(false));
    }

    // eslint-disable-next-line
  }, [windowIsOpen, popupVisible]);

  const duration = 400;

  const defaultStyle = {
    transition: `all ${duration}ms linear 0s`,
  };

  const transitionStyles = {
    entering: { right: '-100%' },
    entered: { right: 0 },
    exiting: { right: '-100%' },
    exited: { right: '-100%' },
  };

  return (
    <Transition
      in={popupVisible}
      timeout={{
        appear: 10,
        enter: 0,
        exit: 450,
      }}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          className="popup"
          tabIndex={0}
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          <nav className="popup__nav">
            <Logo onClick={onClick} />
            <Link to={'/'} className="popup__link" onClick={onClick}>
              home
            </Link>
            <Link to="products" className="popup__link" onClick={onClick}>
              products
            </Link>
            <Link to={'/about'} className="popup__link" onClick={onClick}>
              about
            </Link>
          </nav>
        </div>
      )}
    </Transition>
  );
};

export default Popup;
