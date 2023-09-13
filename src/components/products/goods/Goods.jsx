//делает запрос на сервер товаров
//фильтрует товары
//передает пропсы на пагинацию

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../pagination/Pagination';
import { useGetProductsQuery } from '../../api/apiSlice';
import GoodsItem from './GoodsItem';
import { useAuth } from '../../../hooks/use-auth';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';
import { setOrders } from '../../../store/slices/userSlice';
import './goods.scss';

function Goods() {
  const { categories } = useSelector((state) => state.category);
  const { radioFilter } = useSelector((state) => state.radioFilter);
  const { minPrice, maxPrice } = useSelector((state) => state.rangeFilter);
  const { orders, isAuth, email, favorites } = useAuth();
  const dispatch = useDispatch();
  //-------------------------------
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
  };
 */
  //------------------------------------
  const {
    data: products = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery();

  const productRangeFilter = (products, minPrice, maxPrice) => {
    const newProducts = products.filter((item) => {
      if (item.price < maxPrice && item.price > minPrice) {
        return item;
      }
    });
    return newProducts;
  };

  const productCategoryFilter = (currentProducts, categories) => {
    const items = currentProducts.filter((item) => {
      if (categories === 'all') return currentProducts;
      return item.category == categories;
    });

    return items;
  };

  const productsRadioFilter = (products) => {
    const newArray = products;

    if (radioFilter === '' || radioFilter === 'disable filter') return products;
    if (radioFilter === 'high rating') {
      return newArray.sort((a, b) => a.rating.rate - b.rating.rate);
    }
    if (radioFilter === 'popular') {
      return newArray.sort((a, b) => a.rating.count - b.rating.count);
    }
    if (radioFilter === 'expensive first') {
      return newArray.sort((a, b) => b.price - a.price);
    }
    if (radioFilter === 'cheap first') {
      return newArray.sort((a, b) => a.price - b.price);
    }
  };

  //setCurrentPage в paginate устанавливает текущую страницу
  //продуктов на странице 9
  //индекс последнего продукта = текущая страница * продуктов на странице
  //индекс первого продукта = индекс последнего продукта - количество продуктов на странице

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderItems = (products) => {
    const item = products.map((item) => {
      return (
        <React.Fragment key={item.id}>
          <GoodsItem item={item} />
        </React.Fragment>
      );
    });
    return item;
  };

  const filteredItems = productsRadioFilter(
    productCategoryFilter(
      productRangeFilter(products, minPrice, maxPrice),
      categories
    )
  );

  const items = renderItems(
    filteredItems.slice(firstProductIndex, lastProductIndex)
  );

  return (
    <div className="goods">
      {items}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredItems.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Goods;
