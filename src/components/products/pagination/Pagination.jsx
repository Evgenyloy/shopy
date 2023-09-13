import React from 'react';
import './pagination.scss';
function Pagination({ productsPerPage, totalProducts, paginate, currentPage }) {
  const pageNumber = [];

  //количество страниц pageNumber добавляем туда через for
  //totalProducts - все количество с сервера
  //paginate - устанавливает текущею страницу
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__inner">
        {pageNumber.map((number) => {
          let clazz;
          currentPage === number
            ? (clazz = 'pagination__page-link pagination__page-link_current')
            : (clazz = 'pagination__page-link');
          return (
            <li className="pagination__page-item" key={number}>
              <a href="#" className={clazz} onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pagination;
