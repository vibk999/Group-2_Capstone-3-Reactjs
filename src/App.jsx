import "./App.css";
import React, { useEffect } from "react";
import Home from "./Movie User Page/views/Home";
import Detail from "./Movie User Page/views/Detail";
import SignIn from "./Movie User Page/views/Signin";
import SignUp from "./Movie User Page/views/Signup";
import BookingSeat from "./Movie User Page/views/BookingSeat";
import { BrowserRouter, Route, Routes } from "react-router";
import { connect, useDispatch } from "react-redux";
import { fetchMe } from "./Movie User Page/store/action/auth";
// import { AuthRoute, NormalRoute, PrivateRoute } from "./HOCs/Route";
import MyAccount from "./Movie User Page/views/MyAccount";
function App() {
  const dispatch = useDispatch();
  const tokenCyberSoft =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA";

  useEffect(() => {
    // Lưu token vào localStorage
    localStorage.setItem("tokenCyberSoft", tokenCyberSoft);

    const tokenSignIn = localStorage.getItem("tokenSignIn");
    if (tokenSignIn) {
      dispatch(fetchMe);
    }
  }, []); // useEffect chạy khi props thay đổi

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/movie/detail/:id"
          redirectPath="/movie"
          element={Detail}
        />
        <Route
          path="/movie/myAccount"
          redirectPath="/movie"
          element={MyAccount}
        />
        <Route
          path="/movie/booking/:maLichChieu"
          redirectPath="/movie"
          element={BookingSeat}
        />
        <Route path="/movie/signin" redirectPath="/movie" element={SignIn} />
        <Route path="/movie/signup" redirectPath="/movie" element={SignUp} />
        <Route path="/movie" redirectPath="/signin" element={Home} />
      </Routes>
    </BrowserRouter>
  );
}
export default connect()(App);
