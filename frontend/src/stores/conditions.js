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
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    // increment() {
    //   this.counter++
    // }
  }
})
