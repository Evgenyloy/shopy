import BasketItem from './BasketItem';
import { Fragment } from 'react';
import { useAuth } from '../../hooks/use-auth';
import './basket.scss';

function Basket() {
  let { orders } = useAuth();

  const price = orders.map((item) => {
    return item.quantity * item.price;
  });

  const priceSum = price.length > 0 ? price.reduce((a, b) => a + b) : 0;
  const formatPrice = priceSum.toFixed(2);

  const renderItems = orders.map((item) => {
    return (
      <Fragment key={item.id}>
        <BasketItem item={item} />
      </Fragment>
    );
  });

  return (
    <div className="basket">
      <div className="container">
        <div className="basket__header">
          <div className="basket__header-inner">
            <p className="basket__header-text p1">name</p>
            <p className="basket__header-text p2">quantity</p>
            <p className="basket__header-text p3">price</p>
          </div>
        </div>
        <div className="basket__inner">{renderItems}</div>
        <div className="basket__footer">
          <div className="basket__footer-inner">
            <p className="basket__footer-total">Total</p>
            <p className="basket__footer-price">{formatPrice + ' $'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basket;
