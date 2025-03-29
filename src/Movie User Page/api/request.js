import axios from "axios";

export const request = ({ method, url, data, params }) => {
  const token = localStorage.getItem("tokenSignIn");
  const headers = {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios({ method, url, data, params, headers });
};
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { hideLoading, showLoading } from "../redux/loadingSlice";
// import { store } from "../main";
// export const CYBER_TOKERN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA";

// export const https = axios.create({
//   baseURL: "https://movienew.cybersoft.edu.vn",
//   headers: {
//     Authorization: `Bearer ${CYBER_TOKERN}`,
//     TokenCybersoft: CYBER_TOKERN,
//   },
// });
