import axiosInstance from "./axios";

export const getSearch = () => {
  const searchUrl = "/tickets/get-search";
  return axiosInstance.get(searchUrl);

};

export const getTickets = (searchId) => {
  const ticketsUrl = `/tickets?searchId=${searchId}`;
  return axiosInstance.get(ticketsUrl);
};
