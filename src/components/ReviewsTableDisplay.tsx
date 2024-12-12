import React from "react";
import "./ReviewsTable.css";
import { Review } from "../types";

interface ReviewsTableDisplayProps {
  reviews: Review[];
}

const ReviewsTableDisplay: React.FC<ReviewsTableDisplayProps> = ({
  reviews,
}) => {
  return (
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
        {reviews.map((review) => (
          <tr key={review.id}>
            <td>{review.platform}</td>
            <td>{review.rating}</td>
            <td>{new Date(review.date).toLocaleString()}</td>
            <td>{review.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReviewsTableDisplay;
