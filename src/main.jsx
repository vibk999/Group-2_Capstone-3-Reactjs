import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import userReducer from "../src/Movie User Page/store/reducers/userSlice.js";
import movieReducer from "../src/Movie User Page/store/reducers/movieSlice.js";
// import store from "./Movie User Page/store";
export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
  },
});
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
