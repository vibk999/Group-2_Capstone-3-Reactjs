import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketDetail: {},
  me: null,
  accountInfor: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTicketDetail: (state, action) => {
      state.ticketDetail = action.payload;
    },
    setAccountInfor: (state, action) => {
      state.accountInfor = action.payload;
    },
    setMe: (state, action) => {
      state.me = action.payload;
    },
  },
});

// Export actions
export const { setTicketDetail, setAccountInfor, setMe } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
