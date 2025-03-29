import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: [],
  movieDetail: {},
  movieBanner: [],
  movieCinemaList: [],
  thongTinPhim: {},
  danhSachGhe: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieList: (state, action) => {
      state.movieList = action.payload;
    },
    setMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
    setMovieBanner: (state, action) => {
      state.movieBanner = action.payload;
    },
    setMovieCinema: (state, action) => {
      state.movieCinemaList = action.payload;
    },
    setCinemaListSeat: (state, action) => {
      state.thongTinPhim = action.payload.thongTinPhim;
      state.danhSachGhe = action.payload.danhSachGhe;
    },
  },
});

// Export actions
export const {
  setMovieList,
  setMovieDetail,
  setMovieBanner,
  setMovieCinema,
  setCinemaListSeat,
} = movieSlice.actions;

// Export reducer
export default movieSlice.reducer;
