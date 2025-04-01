import { request } from "../../api/request";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAccountInfor, setMe } from "../reducers/userSlice";

// Redux Thunk for User Sign-In
export const signIn = (userLogin, callBack) => {
  return async (dispatch) => {
    try {
      const response = await request({
        method: "POST",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        data: userLogin,
      });
      console.log(response.data.content);
      dispatch(setMe(response.data.content));
      const user = response.data.content;
      const userJson = JSON.stringify(user);
      localStorage.setItem("USER", userJson);

      if (callBack) callBack();
    } catch (error) {
      console.error("Error during sign-in:", error);

      // Displaying error message if it exists
      const errorMessage = error?.response?.data?.content || "Sign-in failed!";
      alert(errorMessage);
    }
  };
};

// Redux Thunk for Fetching User Information
export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await request({
        method: "POST",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      });

      console.log("User information fetched successfully:", response);
      dispatch(setMe(response.data.content));
      dispatch(setAccountInfor(response.data.content));
    } catch (error) {
      console.error("Error fetching user information:", error);

      // Return a custom error message or reject value
      return rejectWithValue(
        error?.response?.data?.content || "Failed to fetch user information!"
      );
    }
  }
);
export const updateAccountInfo = createAsyncThunk(
  "account/updateAccountInfo",
  async (formData) => {
    const response = await request({
      method: "PUT",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data: formData,
    });
    return response.data;
  }
);
