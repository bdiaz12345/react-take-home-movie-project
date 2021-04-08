import React from 'react';
import PropTypes from 'prop-types';

export function Pagination({page, lastPage, setPage}) {
  const visiblePages = Array.from({length: lastPage}).map((_, i) => i + 1);
  return (
    <ul className="pagination justify-content-center mt-3">
      <li className="page-item">
        <button
          className="page-link"
          onClick={page > 1 ? () => setPage(page - 1) : undefined}
        >
          &laquo;
        </button>
      </li>
      {visiblePages.map(n => (
        <li className={`page-item ${n === page && 'active'}`} key={n}>
          <button className="page-link" onClick={() => setPage(n)}>
            {n} <span className="sr-only">(current)</span>
          </button>
        </li>
      ))}
      <li className="page-item">
        <button
          className="page-link"
          onClick={page < lastPage ? () => setPage(page + 1) : undefined}
        >
          &raquo;
        </button>
      </li>
    </ul>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
};