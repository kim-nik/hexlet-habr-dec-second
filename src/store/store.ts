import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas/sagas";
import reviewsReducer from "../reducers/reducer";

const sagaMiddleware = createSagaMiddleware();
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: reviewsReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
