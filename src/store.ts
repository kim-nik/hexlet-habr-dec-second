import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reviewsReducer from "./reducer";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: reviewsReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
