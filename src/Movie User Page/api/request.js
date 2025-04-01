import axios from "axios";

export const request = ({ method, url, data, params }) => {
  const userJson = localStorage.getItem("USER");
  const token = JSON.parse(userJson);
  const headers = {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA",
  };

  if (token) {
    headers.Authorization = `Bearer ${token?.accessToken}`;
  }

  return axios({ method, url, data, params, headers });
};
