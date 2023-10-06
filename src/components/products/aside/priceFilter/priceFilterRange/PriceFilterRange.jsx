import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from 'react-slider';
import {
  minPriceFilterChanged,
  maxPriceFilterChanged,
} from './PriceFilterRangeSlice';

import './priceFilterRange.scss';

function PriceFilterRange() {
  const { minPrice, maxPrice } = useSelector((state) => state.rangeFilter);
  const dispatch = useDispatch();

  const onFilterChange = (v, i) => {
    if (i === 0) {
      dispatch(minPriceFilterChanged(v[0]));
    }
    if (i === 1) {
      dispatch(maxPriceFilterChanged(v[1]));
    }
  };

  return (
    <>
      <h2 className="price-filter__title">Price Filter</h2>
      <div className="price-filter__wrapper">
        <div className="price-filter__span-wrapper">
          <span className="price-filter__span">{minPrice + '$'}</span>
          <span className="price-filter__span">{maxPrice + '$'}</span>
        </div>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          value={[minPrice, maxPrice]}
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
