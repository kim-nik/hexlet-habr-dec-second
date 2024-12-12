import { all, put, takeLatest } from "redux-saga/effects";
import { FETCH_REVIEWS, setReviews } from "./actions";
import { mockReviews } from "./mockReviews";

function* fetchReviewsSaga() {
  yield put(setReviews(mockReviews));
}

export function* rootSaga() {
  yield all([takeLatest(FETCH_REVIEWS, fetchReviewsSaga)]);
}
