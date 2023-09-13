import React, { useState } from 'react';

import ReactSlider from 'react-slider';
import {
  minPriceFilterChanged,
  maxPriceFilterChanged,
} from './PriceFilterRangeSlice';
import { useDispatch } from 'react-redux';

import './priceFilterRange.scss';

function PriceFilterRange() {
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(1000);
  const dispatch = useDispatch();

  const onFilterChange = (v, i) => {
    if (i === 0) {
      setInput1(v[0]);
      dispatch(minPriceFilterChanged(v[0]));
    }
    if (i === 1) {
      setInput2(v[1]);
      dispatch(maxPriceFilterChanged(v[1]));
    }
  };

  return (
    <>
      <h2 className="price-filter__title">Price Filter</h2>
      <div className="price-filter__wrapper">
        <div className="price-filter__span-wrapper">
          <span className="price-filter__span">{input1 + '$'}</span>
          <span className="price-filter__span">{input2 + '$'}</span>
        </div>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          value={[input1, input2]}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => <div {...props}>{}</div>}
          pearling={false}
          minDistance={50}
          max={1000}
          min={0}
          step={50}
          onChange={(v, i) => onFilterChange(v, i)}
        />
      </div>
    </>
  );
}

export default PriceFilterRange;
