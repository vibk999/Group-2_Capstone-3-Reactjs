import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from "./Movie User Page/store";
// export const store = configureStore({
//   reducer: {
//     userSlice: userSlice,
//     loadingSlice: loadingSlice,
//   },
// });
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
