import { Review } from "../types";

export const FETCH_REVIEWS = "FETCH_REVIEWS";
export const SET_REVIEWS = "SET_REVIEWS";
export const DELETE_REVIEW = "DELETE_REVIEW";

export interface SetReviewsAction {
  type: typeof SET_REVIEWS;
  payload: Review[];
}

export interface DeleteReviewAction {
  type: typeof DELETE_REVIEW;
  payload: number;
}

export type ReviewAction = SetReviewsAction | DeleteReviewAction;

export const fetchReviews = () => ({ type: FETCH_REVIEWS });
export const setReviews = (reviews: Review[]): SetReviewsAction => ({
  type: SET_REVIEWS,
  payload: reviews,
});
export const deleteReview = (id: number): DeleteReviewAction => ({
  type: DELETE_REVIEW,
  payload: id,
});
