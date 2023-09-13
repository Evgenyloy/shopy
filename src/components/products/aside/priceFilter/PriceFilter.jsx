import React from 'react';

import PriceFilterRadio from './PriceFilterRadio/PriceFilterRadio';
import PriceFilterRange from './priceFilterRange/PriceFilterRange';

import './priceFilter.scss';

function PriceFilter() {
  return (
    <form className="price-filter">
      <PriceFilterRange />
      <PriceFilterRadio />
    </form>
  );
}

export default PriceFilter;
