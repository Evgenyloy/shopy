import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../logo/Logo';
import HeaderNav from './headerNav/HeaderNav';
import HeaderTools from './headerTools/HeaderTools';
import { changePopUp } from '../../../store/slices/popupSlice';
import { categoryChange } from '../../products/aside/categories/categoriesSlice';
import { radioFilterChanged } from '../../products/aside/priceFilter/PriceFilterRadio/priceFilterRadioSlice';
import {
  minPriceFilterChanged,
  maxPriceFilterChanged,
} from '../../products/aside/priceFilter/priceFilterRange/PriceFilterRangeSlice';

import './headerMain.scss';

const HeaderMain = () => {
  const { popupVisible } = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category.categories);
  const radio = useSelector((state) => state.radioFilter.radioFilter);
  const { minPrice, maxPrice } = useSelector((state) => state.rangeFilter);

  const handleClick = (category, radio, minPrice, maxPrice) => {
    if (category !== 'all') {
      dispatch(categoryChange('all'));
    }
    if (radio) {
      if (radio !== '') dispatch(radioFilterChanged(''));
    }
    if (minPrice !== 0 || maxPrice !== 1000) {
      dispatch(minPriceFilterChanged(0));
      dispatch(maxPriceFilterChanged(1000));
    }
  };

  const onButtonClick = () => {
    dispatch(changePopUp());
  };

  const burgerClassName = popupVisible ? 'burger active' : 'burger';

  return (
    <div className="headerMain">
      <div className="container">
        <div className="headerMain__inner">
          <Logo />
          <HeaderNav
            handleClick={() => handleClick(category, radio, minPrice, maxPrice)}
          />
          <HeaderTools
            handleClick={() => handleClick(category, radio, minPrice, maxPrice)}
          />
          <div className={burgerClassName} onClick={onButtonClick}>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
