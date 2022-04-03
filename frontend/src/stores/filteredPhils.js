import { defineStore } from 'pinia'
import { search } from '../lib/search'
import data0 from '../util/data'; // TODO APIからとる

export const usePhFiltered = defineStore({
  id: 'phils',
  state: () => ({
    data: data0
  }),
  // state: () => (data),
  getters: {
    phFiltered: (state) => state.data,
  },
  actions: {
    filterPhils(data) {
      this.data = data;
    },
    // async search(conditions) {
    //   const filteredPhils = await search(data, conditions);
    //   console.log(filteredPhils);
    //   this.$state = filteredPhils;
    // },
    clearFilter() {
      this.phFiltered = data
    },
    setFilter(newState) {
      this.phFiltered = newState
    }  
  } 
})