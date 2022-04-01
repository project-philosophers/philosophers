import { defineStore } from 'pinia'

export const useSearchConditions = defineStore({
  id: 'searchConditions',
  state: () => ({
  name: '',
  period: {
    from: 0,
    to: 2000
  },
  tags: {
    categories: [],
    education: [],
    keywords: [],
    languages: [],
    nationalities: []
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