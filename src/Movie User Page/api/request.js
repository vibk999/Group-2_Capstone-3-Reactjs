import axios from "axios";

export const request = ({ method, url, data, params }) => {
  const variables = {
    method,
    url,
    data,
    params,
  };

  const tokenSignIn = localStorage.getItem("tokenSignIn");
  const tokenCyberSoft = localStorage.getItem("tokenCyberSoft");

  if (tokenSignIn && tokenCyberSoft) {
    variables.headers = {
      Authorization: "Bearer " + tokenSignIn,
      TokenCybersoft: tokenCyberSoft,
    };
  } else if (tokenSignIn) {
    variables.headers = {
      Authorization: "Bearer " + tokenSignIn,
    };
  } else if (tokenCyberSoft) {
    variables.headers = {
      TokenCybersoft: tokenCyberSoft,
    };
  }

  console.log("variables axios", variables);

  return axios(variables);
};
