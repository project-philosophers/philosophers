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
    async search(conditions) {
      return search(data, conditions)
    },
    clearFilter() {
      this.phFiltered = data
    },
    setFilter(newState) {
      this.phFiltered = newState
    }  
  } 
})