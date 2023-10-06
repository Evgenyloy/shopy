import React from 'react';

import Goods from './goods/Goods';
import Aside from './aside/Aside';
import NewsLetter from '../newsLetter/NewsLetter';
import './products.scss';

function Products({ products, isLoading, isError, isSuccess }) {
  return (
    <div className="products">
      <div className="container">
        <div className="products__inner">
          <Aside />
          <Goods
            products={products}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
          />
          <NewsLetter />
        </div>
      </div>
    </div>
  );
}

export default Products;
