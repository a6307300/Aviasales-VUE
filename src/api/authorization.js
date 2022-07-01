import axios from "./axios";

export const login = (loginForm) => {
  const loginUrl = "/auth/sign-in";
  return axios.post(loginUrl, loginForm);
};

export const signup = (signupForm) => {
  const signupUrl = "/auth/sign-up";
  return axios.post(signupUrl, signupForm);
};

export const tokenAuth = () => {
  const tokenAuthUrl = "/auth/me";
  return axios.get(tokenAuthUrl);
};

export const refreshAccessToken = (token) => {
  const tokenRefresh = "/auth/refresh-token";
  return axios.post(tokenRefresh, token);
};
