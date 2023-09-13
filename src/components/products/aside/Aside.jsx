import React from 'react';

import Categories from './categories/Categories';
import PriceFilter from './priceFilter/PriceFilter';

import './aside.scss';

function Aside() {
  return (
    <div className="aside">
      <Categories />
      <PriceFilter />
    </div>
  );
}

export default Aside;
