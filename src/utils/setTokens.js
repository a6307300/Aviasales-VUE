function setTokens(tokens) {
  if (
    typeof tokens.authorization === "string" &&
    typeof tokens.refresh === "string"
  ) {
    localStorage.setItem("API_AUTHORIZATION_TOKEN", tokens.authorization);
    localStorage.setItem("API_REFRESH_TOKEN", tokens.refresh);
  }
}

export default setTokens;
