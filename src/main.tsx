import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import ReviewsTable from "./components/ReviewsTable";
import "./global.css";

const App: React.FC = () => (
  <Provider store={store}>
    <ReviewsTable />
  </Provider>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
