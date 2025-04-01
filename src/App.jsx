import "./App.css";
import React, { useEffect } from "react";
import Home from "./Movie User Page/views/Home";
import Detail from "./Movie User Page/views/Detail";
import SignIn from "./Movie User Page/views/Signin";
import SignUp from "./Movie User Page/views/Signup";
import BookingSeat from "./Movie User Page/views/BookingSeat";
import { BrowserRouter, Route, Routes } from "react-router";
// import { useDispatch } from "react-redux";
// import { fetchMe } from "./Movie User Page/store/action/auth";
import MyAccount from "./Movie User Page/views/MyAccount";
import Base from "./Base/Base";
import NotFoundPage from "./Base/NotFoundPage/NotFoundPage";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // Lưu token vào localStorage
  //   // localStorage.setItem("tokenSignIn", tokenCyberSoft);

  //   const tokenSignIn = localStorage.getItem("USER");
  //   if (tokenSignIn) {
  //     dispatch(fetchMe);
  //   }
  // }, [dispatch]); // useEffect chạy khi props thay đổi

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movie/detail/:id" element={<Detail />} />
        <Route path="/movie/myAccount" element={<MyAccount />} />
        <Route path="/movie/booking/:maLichChieu" element={<BookingSeat />} />
        <Route path="/movie/signin" element={<SignIn />} />
        <Route path="/movie/signup" element={<SignUp />} />
        <Route path="/movie" element={<Home />} />
        <Route path="/" element={<Base />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
