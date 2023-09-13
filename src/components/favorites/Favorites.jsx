import React, { useEffect } from 'react';
import './favorites.scss';
import GoodsItem from '../products/goods/GoodsItem';
import { useGetASingleProductQuery } from '../api/apiSlice';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/use-auth';
import { Redirect } from 'react-router-dom';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';

function Favorites() {
  const favoritesItems = useSelector((state) => state.user.favorites);
  const { isAuth, favorites, orders, email } = useAuth();

  /*  useEffect(() => {
    if (!isAuth) return;
    updateUserOrder();
  }, [orders, favorites]);

  const updateUserOrder = async () => {
    if (!isAuth) return;

    const db = getFirestore();
    const userRef = doc(db, 'users', `${email}`);
    await updateDoc(userRef, {
      orders,
      favorites,
    });
  }; */

  const renderItem = favoritesItems.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <GoodsItem item={item} />
      </React.Fragment>
    );
  });
  return (
    <div className="favorites">
      <div className="container">
        <div className="favorites__inner">
          {/* {isAuth ? renderItem : <Redirect to="/login" />} */}
          {renderItem}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
