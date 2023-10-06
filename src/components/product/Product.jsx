import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdArrowBackIos } from 'react-icons/md';
import { IoIosBasket } from 'react-icons/io';
import { HiPlusSmall, HiOutlineMinusSmall } from 'react-icons/hi2';
import {
  removeFavoriteItem,
  addFavoriteItem,
  removeOrder,
  addOrder,
  changeQuantity,
} from '../../store/slices/userSlice';
import { useGetASingleProductQuery } from '../api/apiSlice';
import { useAuth } from '../../hooks/use-auth';
import Spinner from '../spinner/Spinner';
import NewsLetter from '../newsLetter/NewsLetter';
import { checkAvailability } from '../../utils/utils';

import './product.scss';

const Product = () => {
  const { id } = useParams();
  const { favorites, orders } = useAuth();
  const { goBack } = useHistory();
  const {
    data: product = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetASingleProductQuery(id);
  const dispatch = useDispatch();

  const orderItem = orders.filter((item) => {
    if (item.id == product?.id) {
      return item;
    }
  });

  let [value, setValue] = useState(orderItem[0] ? orderItem[0]?.quantity : 1);

  const price = product?.price * value;
  const formatPrice = price.toFixed(2);

  const handlePlusClick = (product) => {
    setValue(++value);
    dispatch(changeQuantity([product?.id, value]));
  };

  const handleMinusClick = (product) => {
    if (value < 2) return;
    setValue(--value);
    dispatch(changeQuantity([product?.id, value]));
  };

  const handleOrderClick = (orders, product) => {
    return checkAvailability(orders, product)
      ? null
      : dispatch(addOrder(product));
  };

  const handleBasketClick = (orders, product) => {
    if (checkAvailability(orders, product)) {
      dispatch(removeOrder(product.id));
      setValue(1);
    } else {
      dispatch(addOrder(product));
      return value === 1 ? null : dispatch(changeQuantity([product.id, value]));
    }
  };

  const handleFavoriteClick = (favorites, item) => {
    return checkAvailability(favorites, item)
      ? dispatch(removeFavoriteItem(item.id))
      : dispatch(addFavoriteItem(item));
  };

  const clazz = favorites.some((i) => {
    return i.id == product?.id;
  })
    ? 'product__svg product__svg--red'
    : 'product__svg';

  const clazz2 = orders.some((i) => {
    return i.id == product?.id;
  })
    ? 'product__svg product__svg--red'
    : 'product__svg';

  const renderItem = (product) => {
    return (
      <>
        <div className="product__img-cont">
          <img
            className="product__img"
            src={product?.image}
            alt={product?.title}
          />
        </div>
        <div className="product__text-block">
          <h2 className="product__title">{product?.title}</h2>
          <p className="product__description">{product?.description}</p>
          <div className="product__quantity">
            <p className="product__quantity-text">Choose Quantity</p>
            <div className="product__quantity-inner">
              <HiPlusSmall
                className="product__quantity-svg"
                onClick={() => handlePlusClick(product)}
              />
              <input
                type="number"
                className="product__input"
                value={value}
                readOnly
                style={value > 9 ? { width: '30px' } : { width: '20px' }}
              />
              <HiOutlineMinusSmall
                className="product__quantity-svg"
                onClick={() => handleMinusClick(product)}
              />
            </div>
          </div>
          <div className="product__order-inner">
            <p className="product__price">{formatPrice + ' $'}</p>
            <div className="product__order-wrapper">
              <IoIosBasket
                className={clazz2}
                onClick={() => handleBasketClick(orders, product)}
              />

              <AiOutlineHeart
                className={clazz}
                onClick={() => handleFavoriteClick(favorites, product)}
              />
              <Link
                to="/checkout"
                className="product__order-link"
                onClick={() => handleOrderClick(orders, product)}
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
        <div className="product__back" onClick={() => goBack()}>
          <MdArrowBackIos className="product__back-svg" />
          <p className="product__back-text">back</p>
        </div>
      </>
    );
  };

  const item = renderItem(product);

  return (
    <>
      <div className="product">
        <div className="container">
          <div className="product__inner">
            {isLoading && <Spinner isLoading={isLoading} />}
            {isError ||
              (product === null && (
                <div
                  style={{
                    textAlign: 'center',
                    color: '#34404b',
                    fontSize: '22px',
                    margin: '0 auto',
                    paddingTop: '150px',
                  }}
                >
                  oops something went wrong please reload the page
                </div>
              ))}
            {isSuccess && product !== null && item}
          </div>
          <NewsLetter />
        </div>
      </div>
    </>
  );
};

export default Product;
