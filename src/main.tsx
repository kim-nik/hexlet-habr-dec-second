import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import ReviewsTable from "./components/ReviewsTable";

const App: React.FC = () => (
  <Provider store={store}>
    <ReviewsTable />
  </Provider>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
