import { changeCurrentPage } from '../../../store/slices/paginationSlice';
import { useDispatch, useSelector } from 'react-redux';

import './pagination.scss';
function Pagination({ productsPerPage, totalProducts, items }) {
  const pageNumber = [];
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const dispatch = useDispatch();
  //количество страниц pageNumber добавляем туда через for
  //totalProducts - все количество с сервера
  //paginate - устанавливает текущею страницу

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i);
  }

  if (items.length === 0) return;

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
              <a
                href="#"
                className={clazz}
                onClick={() => dispatch(changeCurrentPage(number))}
              >
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
