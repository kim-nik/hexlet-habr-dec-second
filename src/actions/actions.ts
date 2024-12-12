import { Review } from "../types";

export const FETCH_REVIEWS = "FETCH_REVIEWS";
export const SET_REVIEWS = "SET_REVIEWS";

export interface SetReviewsAction {
  type: typeof SET_REVIEWS;
  payload: Review[];
}

export const fetchReviews = () => ({ type: FETCH_REVIEWS });
export const setReviews = (reviews: Review[]): SetReviewsAction => ({
  type: SET_REVIEWS,
  payload: reviews,
});
