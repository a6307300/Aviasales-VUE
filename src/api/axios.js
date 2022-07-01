import axios from "axios";
import setTokens from "../utils/setTokens";
import { refreshAccessToken } from "./authorization";
import router from "../router";
import { useUserStore } from "../stores/user";

const axiosInstance = axios.create({
  baseURL: "https://test-api.fusion-tech.pro/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("API_AUTHORIZATION_TOKEN");

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config.__isRetryReques &&
      error.config.url !== "/auth/refresh-token" &&
      error.response.data.message !== "Wrong password"
    ) {
      console.log("refreshing");
      error.config.__isRetryRequest = true;
      const token = localStorage.getItem("API_REFRESH_TOKEN");
      const tokensData = await refreshAccessToken({ token });
      setTokens(tokensData.data.data.tokens);
      return axiosInstance(originalRequest);
    }
    if (
      error.response.data?.message === "Wrong password" ||
      error.response.status === 404
    ) {
      const store = useUserStore();
      store.isPasswordWrong = true;
      store.errorMessage = error.response.data.message;
    }
    if (error.response?.data?.data?.[0]?.message === "Email should be unique") {
      const store = useUserStore();
      store.isPasswordWrong = true;
      store.errorMessage =
        "This email has already been registered Try to log in";
    }
    if (error.response.status === 401) {
      router.replace({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
