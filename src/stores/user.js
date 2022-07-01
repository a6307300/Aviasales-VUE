import { defineStore } from "pinia";

import { signup, login, tokenAuth } from "../api/authorization";
import setTokens from "../utils/setTokens";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    isPasswordWrong: false,
    errorMessage: "",
  }),
  getters: {
    isAuthentificated: (state) => {
      return !!state.user;
    },
  },
  actions: {
    async signUp(dataObj) {
      const userData = await signup(dataObj);
      this.user = userData.data.data.user;
      setTokens(userData.data.data.tokens);
    },
    async logIn(dataObj) {
      const userData = await login(dataObj);
      this.user = userData.data.data.user;
      setTokens(userData.data.data.tokens);
    },
    resetState() {
      this.user = null;
    },
    async getUser() {
      const userData = await tokenAuth();
      this.user = userData.data.data.user;
    },
  },
});
