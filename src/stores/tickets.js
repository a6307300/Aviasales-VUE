import { defineStore } from "pinia";

import { getTickets, getSearch } from "../api/tickets";
import sort from "../utils/sort";
import filterStops from "../utils/filterStops";
import mockData from "./mockData";

export const useTicketsStore = defineStore({
  id: "tickets",
  state: () => ({
    tickets: [],
    searchId: null,
    filters: [],
    sort: "cheap",
    index: 5,
  }),
  getters: {
    filteredTickets: (state) => filterStops(state.tickets, state.filters),
    slicedTickets: (state) => state.filteredTickets.slice(0, state.index),
    isAllShown: (state) =>
      state.filteredTickets.length === state.index ||
      state.filteredTickets.length < state.index,
  },
  actions: {
    async getTickets() {
      try {
        if (!this.searchId) {
          const searchId = await getSearch();
          this.searchId = searchId.data.data.searchId;
        }
        const ticketsData = await getTickets(this.searchId);
        this.tickets = sort(ticketsData.data.data, "cheap");
        return this.tickets;
      } catch (err) {
        console.log(err);
        if (err.response?.status === 500) {
          this.tickets = sort(mockData, "cheap");
        }
      }
    },
    setSort(value) {
      this.sort = value;
    },
    setTicketsSorted() {
      this.tickets = sort(this.tickets, this.sort);
    },
  },
});
