import { defineStore } from 'pinia'

export const usePhilosophers = defineStore({
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
