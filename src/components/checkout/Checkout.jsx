import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteOrders } from '../../store/slices/userSlice';
import { Link } from 'react-router-dom';

import CheckoutPopup from './CheckoutPopup';

import './checkout.scss';

const Checkout = () => {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [val3, setVal3] = useState('');
  const [popup, setPopup] = useState(false);
  const [validEmptyInput, setValidEmptyInput] = useState(false);
  const orders = useSelector((state) => state.user.orders);
  const dispatch = useDispatch();

  const closePopup = () => {
    setPopup(false);
  };

  let inputClassName = validEmptyInput
    ? 'checkout__input input-error'
    : 'checkout__input';

  const handleButtonClick = () => {
    if (!val1 || !val2) {
      setValidEmptyInput(true);
      return;
    }
    if (val1 && val2) {
      setValidEmptyInput(false);
      setVal1('');
      setVal2('');
      setVal3('');
      setPopup(true);
      if (orders.length === 0) return;
      dispatch(deleteOrders());
    }
  };

  const totalPrice = orders
    .map((item) => {
      return item.price * item.quantity;
    })
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  const handleFocus = (e) => {
    e.target.parentNode.classList.add('active');
  };

  const handleBlur = (e) => {
    if (e.target.value) return;
    e.target.parentNode.classList.remove('active');
  };

  const renderItems = orders.map((item) => {
    return (
      <div className="checkout__order-item" key={item.id}>
        <Link className="checkout__item" to={`/product/${item.id}`}>
          {item.title}
        </Link>
        <p className="checkout__quantity">{item.quantity}</p>
        <p className="checkout__price">
          {(item.price * item.quantity).toFixed(2) + '$'}
        </p>
      </div>
    );
  });

  return (
    <div className="checkout">
      <div className="container">
        <div className="checkout__inner">
          <h2 className="checkout__title">Buyer details</h2>
          <div className="checkout__input-wrapper">
            <div className="checkout__input-cont">
              <input
                type="text"
                className={inputClassName}
                id="name"
                value={val1}
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => setVal1(e.target.value)}
              />
              <label className="checkout__name-label" htmlFor="name">
                name
              </label>
            </div>
            <div className="checkout__input-cont">
              <input
                type="number"
                className={inputClassName}
                id="phone"
                value={val2}
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => setVal2(e.target.value)}
              />
              <label className="checkout__tel-label" htmlFor="phone">
                phone
              </label>
            </div>
            <div className="checkout__input-cont">
              <input
                type="email"
                className="checkout__input"
                id="email"
                value={val3}
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => setVal3(e.target.value)}
              />
              <label className="checkout__email-label" htmlFor="email">
                email (not necessary)
              </label>
            </div>
          </div>

          <h3 className="checkout__details">purchase details</h3>
          <div className="checkout__orders">{renderItems}</div>
          <p className="checkout__total">
            Total Price <span>{totalPrice + '$'}</span>
          </p>
          <button
            className="checkout__button"
            onClick={() => handleButtonClick()}
          >
            Valid purchase
          </button>
          <p className="checkout__description">
            After confirming the order, our manager will contact you within five
            minutes.
          </p>
        </div>
      </div>
      <CheckoutPopup popup={popup} closePopup={closePopup} />
    </div>
  );
};

export default Checkout;
