import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHeart } from 'react-icons/ai';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import {
  addFavoriteItem,
  removeFavoriteItem,
  removeOrder,
  addOrder,
} from '../../../store/slices/userSlice';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';

function GoodsItem({ item }) {
  const dispatch = useDispatch();
  const { isAuth, email, favorites, orders } = useAuth();

  const handleFavoriteClick = (favorites, item) => {
    if (!isAuth) return;
    if (
      favorites.some((elem) => {
        return elem.id == item.id;
      })
    ) {
      dispatch(removeFavoriteItem(item.id));
    } else {
      dispatch(addFavoriteItem(item));
    }
  };

  const handleBasketClick = (orders, item) => {
    if (
      orders.some((elem) => {
        return elem.id == item.id;
      })
    ) {
      dispatch(removeOrder(item.id));
    } else {
      dispatch(addOrder(item));
    }
  };

  const clazz = favorites.some((i) => {
    return i.id == item.id;
  })
    ? 'goods__heart-svg goods__heart-svg--red'
    : 'goods__heart-svg';

  const clazz2 = orders.some((i) => {
    return i.id == item.id;
  })
    ? 'goods__heart-svg goods__heart-svg--red'
    : 'goods__heart-svg';

  return (
    <div className="goods__item " key={item.id}>
      <div className="goods__img-cont">
        <img className="goods__img" src={item.image} alt="" />
      </div>
      <h2 className="goods__title">{item.title}</h2>
      <span className="goods__prise">{item.price}$</span>
      <div className="goods__svg-cont">
        <Link
          className="goods__svg-link"
          /*  to={isAuth ? {} : '/login'} */
          to={{}}
          onClick={() => handleFavoriteClick(favorites, item)}
        >
          <AiOutlineHeart className={clazz} />
        </Link>
        <Link
          className="goods__svg-link"
          /*  to={isAuth ? {} : '/login'} */
          to={{}}
          onClick={() => handleBasketClick(orders, item)}
        >
          <PiShoppingCartSimpleBold className={clazz2} />
        </Link>
      </div>

      <a href="#" className="goods__link"></a>
    </div>
  );
}

export default GoodsItem;
