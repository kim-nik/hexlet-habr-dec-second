import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews } from "../actions/actions";

import { RootState } from "../store/store";
import "./ReviewsTable.css";
import Filters from "./Filters";
import ReviewsTableDisplay from "./ReviewsTableDisplay";

const ReviewsTable: React.FC = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.reviews);

  const [platformFilter, setPlatformFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState({ min: 0, max: 5 });
  const [sortOption, setSortOption] = useState("date-desc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const filteredAndSortedReviews = reviews
    .filter(
      (review) =>
        (!platformFilter || review.platform === platformFilter) &&
        review.rating >= ratingFilter.min &&
        review.rating <= ratingFilter.max &&
        review.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "date-desc")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortOption === "date-asc")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortOption === "rating-desc") return b.rating - a.rating;
      if (sortOption === "rating-asc") return a.rating - b.rating;
      return 0;
    });

  return (
    <div className="reviews-container">
      <h1 className="title">Отзывы</h1>
      <Filters
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ReviewsTableDisplay reviews={filteredAndSortedReviews} />
    </div>
  );
};

export default ReviewsTable;
