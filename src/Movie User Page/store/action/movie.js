import { request } from "../../api/request";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setCinemaListSeat,
  setMovieBanner,
  setMovieCinema,
  setMovieDetail,
  setMovieList,
} from "../reducers/movieSlice";

// Fetch Movie List with createAsyncThunk
export const fetchMovieList = createAsyncThunk(
  "movies/fetchMovieList",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await request({
        method: "GET",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
      });

      console.log("res fetchMovieList", response.data.content);
      dispatch(setMovieList(response.data.content));
    } catch (error) {
      console.error("Error fetching movie list", error);
      return rejectWithValue(
        error?.response?.data?.content || "Failed to fetch movies!"
      );
    }
  }
);

// Fetch Movie Detail
export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await request({
        method: "GET",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim",
        params: { MaPhim: id },
      });

      console.log("res fetchMovieDetail", response.data);
      dispatch(setMovieDetail(response.data.content));
    } catch (error) {
      console.error("Error fetching movie detail", error);
      return rejectWithValue(
        error?.response?.data?.content || "Failed to fetch movie detail!"
      );
    }
  }
);

export const fetchMovieBanner = createAsyncThunk(
  "movies/fetchMovieBanner",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await request({
        method: "GET",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
      });

      console.log("res fetchMovieBanner", response.data);
      dispatch(setMovieBanner(response.data.content));
    } catch (error) {
      console.error("Error fetching movie banner", error);
      return rejectWithValue(
        error?.response?.data?.content || "Failed to fetch movie banner!"
      );
    }
  }
);

// Fetch Movie Cinema Information
export const fetchMovieCinema = createAsyncThunk(
  "movies/fetchMovieCinema",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await request({
        method: "GET",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01",
      });

      console.log("res fetchMovieCinema", response.data);
      dispatch(setMovieCinema(response.data.content));
    } catch (error) {
      console.error("Error fetching movie cinema", error);
      return rejectWithValue(
        error?.response?.data?.content || "Failed to fetch cinema information!"
      );
    }
  }
);

// Fetch Cinema List Seat
export const fetchCinemaListSeat = createAsyncThunk(
  "movies/fetchCinemaListSeat",
  async (maLichChieu, { dispatch, rejectWithValue }) => {
    try {
      const response = await request({
        method: "GET",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe",
        params: { MaLichChieu: maLichChieu },
      });

      console.log("res fetchCinemaListSeat", response.data);
      dispatch(setCinemaListSeat(response.data.content));
    } catch (error) {
      console.error("Error fetching cinema seat list", error);
      return rejectWithValue(
        error?.response?.data?.content || "Failed to fetch cinema seat list!"
      );
    }
  }
);

// Post Booking (Dat Ve)
export const postDatVe = createAsyncThunk(
  "movies/postDatVe",
  async (contentData, { rejectWithValue }) => {
    try {
      const response = await request({
        method: "POST",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
        data: contentData,
      });

      console.log("res postDatVe", response.data);
      return response.data; // Return result to use if needed
    } catch (error) {
      console.error("Error posting booking data", error);
      return rejectWithValue(
        error?.response?.data?.content || "Failed to book the ticket!"
      );
    }
  }
);
// export const fetchMovieList = () => {

//   return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
// };

// export const fetchMovieDetail = (id) => {
//   // const url = `/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`;

//   return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
// };
