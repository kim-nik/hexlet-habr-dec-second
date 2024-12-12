import { SetReviewsAction, SET_REVIEWS } from "./actions";
import { Review } from "./types";

type State = {
  reviews: Review[];
};

const initialState: State = {
  reviews: [],
};

const reviewsReducer = (
  state = initialState,
  action: SetReviewsAction
): State => {
  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, reviews: action.payload };
    default:
      return state;
  }
};

export default reviewsReducer;
