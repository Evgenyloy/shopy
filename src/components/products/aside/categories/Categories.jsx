import React from 'react';

import './categories.scss';
import { useDispatch } from 'react-redux';
import { categoryChange } from './categoriesSlice';

function Categories() {
  const dispatch = useDispatch();
  const onclick = (e) => {
    dispatch(categoryChange(e.target.id));
  };

  return (
    <ul className="categories">
      <h3 className="categories__title">Categories</h3>
      <li className="categories__item" id="all" onClick={onclick}>
        All
      </li>
      <li className="categories__item" id="men's clothing" onClick={onclick}>
        Man
      </li>
      <li className="categories__item" id="women's clothing" onClick={onclick}>
        Women
      </li>
      <li className="categories__item" id="jewelery" onClick={onclick}>
        Jewelery
      </li>
      <li className="categories__item" id="electronics" onClick={onclick}>
        Electronics
      </li>
    </ul>
  );
}

export default Categories;
