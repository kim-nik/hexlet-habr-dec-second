import { all, put, takeLatest, call } from "redux-saga/effects";
import {
  DELETE_REVIEW,
  FETCH_REVIEWS,
  setReviews,
  fetchReviews,
  AddReviewAction,
  ADD_REVIEW,
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

function* addReviewSaga(action: AddReviewAction) {
  try {
    const response = yield call(fetch, api.reviewsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });

    if (!response.ok) {
      throw new Error("Failed to add review");
    }

    yield put(fetchReviews()); // Обновляем список отзывов
  } catch (error) {
    console.error("Error adding review:", error);
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

export function* watchAddReview() {
  yield takeLatest(ADD_REVIEW, addReviewSaga);
}

export function* rootSaga() {
  yield all([
    watchAddReview(),
    watchDeleteReview(),
    takeLatest(FETCH_REVIEWS, fetchReviewsSaga),
  ]);
}
