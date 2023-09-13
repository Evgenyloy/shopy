import './priceFilterRadio.scss';
import { useDispatch } from 'react-redux';
import { radioFilterChanged } from './priceFilterRadioSlice';

function PriceFilterRadio() {
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
        value="popular"
        id="popular"
        onChange={onClick}
      />
      <label className="filter-radio__label" htmlFor="popular">
        popular
      </label>

      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="cheap first"
        id="cheap first"
        onChange={onClick}
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
      />
      <label className="filter-radio__label" htmlFor="expensive first">
        expensive first
      </label>

      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="high rating"
        id="high rating"
        onChange={onClick}
      />
      <label className="filter-radio__label" htmlFor="high rating">
        high rating
      </label>
      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="disable filter"
        id="disable filter"
        onChange={onClick}
      />
      <label className="filter-radio__label" htmlFor="disable filter">
        disable filter
      </label>
    </div>
  );
}

export default PriceFilterRadio;
