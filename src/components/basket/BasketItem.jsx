import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { BsXLg } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeOrder } from '../../store/slices/userSlice';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../hooks/use-auth';

function BasketItem({ item }) {
  let [qty, setQty] = useState(item.quantity);
  let [price, setPrice] = useState(item.price);
  const formatPrice = price.toFixed(2);
  const dispatch = useDispatch();
  let { orders, isAuth, email } = useAuth();
  //------------------------------------------------------------------------------------------
  const updateUserOrder = async () => {
    if (!isAuth) return;
    const db = getFirestore();
    const userRef = doc(db, 'users', `${email}`);
    await updateDoc(userRef, {
      orders,
    });
  };

  useEffect(() => {
    updateUserOrder();
  }, [orders]);

  //------------------------------------------------------------------------------------------

  const handleClick = (e, item) => {
    if (e.target.className.baseVal == 'basket-item__input-up') {
      setQty(++qty);
      setPrice(item.price * qty);
      dispatch(changeQuantity([item.id, qty]));
    }
    if (e.target.className.baseVal == 'basket-item__input-down' && qty > 0) {
      setQty(--qty);
      setPrice(item.price * qty);
      dispatch(changeQuantity([item.id, qty]));
    }
  };
  const handleInputChange = (e) => {
    setQty(e.target.value);
    dispatch(() => changeQuantity([item.id, qty]));
  };
  const handleDeleteItem = (item) => {
    dispatch(removeOrder(item.id));
  };

  return (
    <div className="basket-item">
      <div className="basket-item__inner">
        <div className="basket-item__img-cont">
          <img src={item.image} alt="" className="basket-item__img" />
        </div>
        <h2 className="basket-item__title">{item.title}</h2>
        <div className="basket-item__input-wrapper">
          <input
            className="basket-item__input"
            type="number"
            value={qty}
            readOnly
            onChange={(e) => handleInputChange(e, item)}
          />
          <div
            className="basket-item__input-arrows "
            onClick={(e) => handleClick(e, item)}
          >
            <MdKeyboardArrowUp className="basket-item__input-up" />

            <MdKeyboardArrowDown className="basket-item__input-down" />
          </div>
        </div>
        <p className="basket-item__price">{formatPrice + ' $'}</p>
        <div
          className="basket-item__delete-btn"
          onClick={(e) => handleDeleteItem(item)}
        >
          <BsXLg />
        </div>
      </div>
    </div>
  );
}

export default BasketItem;
