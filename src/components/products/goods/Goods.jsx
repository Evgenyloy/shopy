import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../pagination/Pagination';
import GoodsItem from './GoodsItem';
import Spinner from '../../spinner/Spinner';

import './goods.scss';

function Goods({ products, isError, isLoading, isSuccess }) {
  const { categories } = useSelector((state) => state.category);
  const { radioFilter } = useSelector((state) => state.radioFilter);
  const { minPrice, maxPrice } = useSelector((state) => state.rangeFilter);

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
    const newArray = [...products];

    if (radioFilter === '' || radioFilter === 'disable filter') return products;
    if (radioFilter === 'high rating') {
      return newArray.sort((a, b) => b.rating.rate - a.rating.rate);
    }
    if (radioFilter === 'popular') {
      return newArray.sort((a, b) => b.rating.count - a.rating.count);
    }
    if (radioFilter === 'expensive first') {
      return newArray.sort((a, b) => b.price - a.price);
    }
    if (radioFilter === 'cheap first') {
      return newArray.sort((a, b) => a.price - b.price);
    }
  };

  const currentPage = useSelector((state) => state.pagination.currentPage);

  const [productsPerPage] = useState(9);
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

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
      {isLoading && <Spinner isLoading={isLoading} />}
      {isError && (
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
      )}
      {items.length === 0 && isSuccess ? <Stub /> : items}

      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredItems.length}
        items={items}
      />
    </div>
  );
}

const Stub = () => {
  return (
    <div className="goods__stub">
      There are no matches in this product category
    </div>
  );
};

export default Goods;
