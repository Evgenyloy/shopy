import React from 'react';

import Categories from './categories/Categories';
import PriceFilter from './priceFilter/PriceFilter';

import './aside.scss';

function Aside() {
  return (
    <aside className="aside">
      <Categories />
      <PriceFilter />
    </aside>
  );
}

export default Aside;
