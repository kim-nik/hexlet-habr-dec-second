import { all, put, takeLatest, call } from "redux-saga/effects";
import {
  DELETE_REVIEW,
  FETCH_REVIEWS,
  setReviews,
  fetchReviews,
} from "../actions/actions";
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
  }
}

function* deleteReviewSaga(action) {
  try {
    const response = yield call(
      fetch,
      `${api.reviewsEndpoint}/${action.payload}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete review");
    }
    yield put(fetchReviews()); // Обновляем список после удаления
  } catch (error) {
    console.error("Error deleting review:", error);
  }
}

export function* watchDeleteReview() {
  yield takeLatest(DELETE_REVIEW, deleteReviewSaga);
}

export function* rootSaga() {
  yield all([watchDeleteReview(), takeLatest(FETCH_REVIEWS, fetchReviewsSaga)]);
}
