import React from 'react';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight, FaAngleUp, FaAngleDown } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange, tasksPerPage, setTasksPerPage }) => {
  return (
    <div className="pagination">
      <div className="fpagination">
        <button className="tasks-per-page-btn" onClick={() => setTasksPerPage(20)}>
          20 
        </button>
        <div className="arrowactions">
        <div className='arrowup'><FaAngleUp /> </div>
          <div className='arrowdown'><FaAngleDown /> </div>
        </div>
      </div>

      <div className="epagination">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="pagination-btn"
          aria-label="Go to first page"
        >
          <FaAngleDoubleLeft /> First
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
          aria-label="Go to previous page"
        >
          <FaAngleLeft /> Prev
        </button>

        <button className="pagination-btn" disabled>
          <span>{currentPage}</span>
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
          aria-label="Go to next page"
        >
          Next <FaAngleRight />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
          aria-label="Go to last page"
        >
          Last <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
