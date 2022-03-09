import { defineStore } from 'pinia'

export const useSearchCondition = defineStore({
  id: 'searchCondition',
  state: () => ({
  name: null,
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
    condition: (state) => state,
  },
  actions: {
  }
})
export const useCounterStore = defineStore({
  id: 'conditions',
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
