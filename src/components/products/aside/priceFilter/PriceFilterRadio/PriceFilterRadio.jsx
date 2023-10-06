import { useDispatch, useSelector } from 'react-redux';
import { radioFilterChanged } from './priceFilterRadioSlice';

import './priceFilterRadio.scss';

function PriceFilterRadio() {
  const value = useSelector((state) => state?.radioFilter?.radioFilter);
  const dispatch = useDispatch();

  const onClick = (e) => {
    dispatch(radioFilterChanged(e.target.id));
  };

  return (
    <div className="filter-radio">
      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="cheap first"
        id="cheap first"
        onChange={onClick}
        checked={value == 'cheap first' ? true : false}
      />
      <label className="filter-radio__label" htmlFor="cheap first">
        cheap first
      </label>

      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="expensive first"
        id="expensive first"
        onChange={onClick}
        checked={value == 'expensive first' ? true : false}
      />
      <label className="filter-radio__label" htmlFor="expensive first">
        expensive first
      </label>

      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="popular"
        id="popular"
        onChange={onClick}
        checked={value == 'popular' ? true : false}
      />
      <label className="filter-radio__label" htmlFor="popular">
        popular
      </label>

      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="high rating"
        id="high rating"
        onChange={onClick}
        checked={value == 'high rating' ? true : false}
      />
      <label className="filter-radio__label" htmlFor="high rating">
        high rating
      </label>
    </div>
  );
}

export default PriceFilterRadio;
