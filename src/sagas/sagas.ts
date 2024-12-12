import { all, put, takeLatest, call } from "redux-saga/effects";
import { FETCH_REVIEWS, setReviews } from "../actions/actions";
import api from "../api";

function* fetchReviewsSaga() {
  try {
    const response = yield call(fetch, api.reviewsEndpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = yield response.json();
    yield put(setReviews(reviews));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    // Handle error (e.g., dispatch an action to set an error state)
  }
}

export function* rootSaga() {
  yield all([takeLatest(FETCH_REVIEWS, fetchReviewsSaga)]);
}
