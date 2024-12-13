import React, { useEffect, useState } from "react";
import "./ReviewsTable.css";
import { Review } from "../types";

import { useDispatch } from "react-redux";
import { deleteReview, fetchReviews } from "../actions/actions";
import { AppDispatch } from "../store/store";

interface ReviewsTableDisplayProps {
  reviews: Review[];
}

const ReviewsTableDisplay: React.FC<ReviewsTableDisplayProps> = ({
  reviews,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  useEffect(() => {
    // при изменении фильтров переходим на первую страницу
    setCurrentPage(1);
  }, [reviews]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteReview(id));
  };

  const renderPageNumbers = () => {
    const pagesToShow = Math.min(5, totalPages);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ).map((page) => (
      <button
        key={page}
        onClick={() => handlePageClick(page)}
        disabled={page === currentPage}
        className={page === currentPage ? "active-page" : ""}
      >
        {page}
      </button>
    ));
  };

  return (
    <div>
      <table className="reviews-table">
        <thead>
          <tr>
            <th>Платформа</th>
            <th>Рейтинг</th>
            <th>Время добавления</th>
            <th>Текст отзыва</th>
          </tr>
        </thead>
        <tbody>
          {currentReviews.map((review, index) => (
            <tr key={review.id! + index}>
              <td>{review.platform}</td>
              <td>{review.rating}</td>
              <td>{new Date(review.date).toLocaleString()}</td>
              <td>{review.text}</td>
              <td>
                <button onClick={() => handleDelete(review.id!)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Назад
        </button>
        {renderPageNumbers()}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Вперед
        </button>
      </div>
    </div>
  );
};

export default ReviewsTableDisplay;
