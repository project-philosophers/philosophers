import { defineStore } from 'pinia'

<<<<<<< HEAD
export const useConditions = defineStore({
=======
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
>>>>>>> 6cddffa3b9b15ff57f22de86476402b51d26ac1d
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
