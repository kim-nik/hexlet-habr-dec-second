import {
  ADD_REVIEW,
  DELETE_REVIEW,
  ReviewAction,
  SET_REVIEWS,
} from "../actions/actions";
import { Review } from "../types";

type State = {
  reviews: Review[];
};

const initialState: State = {
  reviews: [],
};

const reviewsReducer = (state = initialState, action: ReviewAction): State => {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case SET_REVIEWS:
      return { ...state, reviews: action.payload };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reviewsReducer;
