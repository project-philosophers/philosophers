import { defineStore } from 'pinia'
import { search } from '../lib/search'
import data from '../util/data'; // TODO APIからとる

export const usePhFiltered = defineStore({
  id: 'phils',
  state: () => (data),
  getters: {
    phFiltered: (state) => state,
  },
  actions: {
    filterPhils(data) {
      this.$state = data;
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