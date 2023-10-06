import { useHistory } from 'react-router-dom';
import { Transition } from 'react-transition-group';

import './checkoutPopup.scss';

const CheckoutPopup = ({ popup, closePopup }) => {
  const { push } = useHistory();
  const handleClick = () => {
    closePopup();
    push('/');
  };

  const duration = 100;
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <Transition
      in={popup}
      timeout={duration}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      {(state) => (
        <div
          className="checkout-popup"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div className="checkout-popup__text-block">
            <p className="checkout-popup__text">
              {' '}
              After confirming the order, our manager will contact you within
              five minutes.
            </p>
            <div className="checkout-popup__button" onClick={handleClick}>
              ok
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default CheckoutPopup;
