import { defineStore } from 'pinia'

export const useIsSearching = defineStore({
  id: 'isSearching',
  state: () => ({
    isSearching: false
  }),
  actions: {
    switch() {
      this.isSearching = !this.isSearching;
      // console.log(this.isSearching);
    }
  }
})

export const useSearchConditions = defineStore({
  id: 'searchConditions',
  state: () => ({
    conditions: {
      name: '',
      period: {
        from: -1000,
        to: 2000
      },
      tags: {
        categories: [],
        education: [],
        keywords: [],
        languages: [],
        nationalities: []
      }
    }
  }),
  getters: {
    conditions: (state) => state,
  },
  actions: {
    updateConditions(conditions) {
      this.$state = conditions;
    }
  }
})