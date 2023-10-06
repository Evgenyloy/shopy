import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { categoryChange } from './categoriesSlice';
import { changeCurrentPage } from '../../../../store/slices/paginationSlice';

import './categories.scss';

function Categories() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.categories);

  useEffect(() => {
    document.querySelectorAll('.categories__item').forEach((item) => {
      if (item.id == category) {
        item.className = 'categories__item active';
      } else {
        item.className = 'categories__item';
      }
    });
  }, [category]);

  const handleClick = (e) => {
    dispatch(categoryChange(e.target.id));
    dispatch(changeCurrentPage(1));
  };

  return (
    <ul className="categories">
      <h3 className="categories__title">Categories</h3>
      <li className="categories__item" id="all" onClick={(e) => handleClick(e)}>
        All
      </li>
      <li
        className="categories__item"
        id="women's clothing"
        onClick={(e) => handleClick(e)}
      >
        Women
      </li>
      <li
        className="categories__item"
        id="men's clothing"
        onClick={(e) => handleClick(e)}
      >
        Man
      </li>

      <li
        className="categories__item"
        id="jewelery"
        onClick={(e) => handleClick(e)}
      >
        Jewelry
      </li>
      <li
        className="categories__item"
        id="electronics"
        onClick={(e) => handleClick(e)}
      >
        Electronics
      </li>
    </ul>
  );
}

export default Categories;
