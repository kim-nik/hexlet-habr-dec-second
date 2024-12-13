import { Review } from "../types";

export const FETCH_REVIEWS = "FETCH_REVIEWS";
export const SET_REVIEWS = "SET_REVIEWS";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const ADD_REVIEW = "ADD_REVIEW";

export interface SetReviewsAction {
  type: typeof SET_REVIEWS;
  payload: Review[];
}

export interface DeleteReviewAction {
  type: typeof DELETE_REVIEW;
  payload: number;
}

export interface FetchReviewsAction {
  type: typeof FETCH_REVIEWS;
}

export interface AddReviewAction {
  type: typeof ADD_REVIEW;
  payload: Review;
}

export type ReviewAction =
  | FetchReviewsAction
  | SetReviewsAction
  | DeleteReviewAction
  | AddReviewAction;

export const addReview = (review: Review): AddReviewAction => ({
  type: ADD_REVIEW,
  payload: review,
});

export const fetchReviews = (): ReviewAction => ({
  type: FETCH_REVIEWS,
});
export const setReviews = (reviews: Review[]): SetReviewsAction => ({
  type: SET_REVIEWS,
  payload: reviews,
});
export const deleteReview = (id: number): DeleteReviewAction => ({
  type: DELETE_REVIEW,
  payload: id,
});
