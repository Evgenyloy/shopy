import React from 'react';

import Goods from './goods/Goods';
import Aside from './aside/Aside';
import NewsLetter from '../newsLetter/NewsLetter';
import './products.scss';

function Products() {
  return (
    <div className="products">
      <div className="container">
        <div className="products__inner">
          <Aside />
          <Goods />
          <NewsLetter />
        </div>
      </div>
    </div>
  );
}

export default Products;
