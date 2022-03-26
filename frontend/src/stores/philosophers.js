import { defineStore } from 'pinia'

export const usePhilosophers = defineStore({
  id: 'philosophers',
  state: () => ({
    phils: []
  }),
  getters: {
    preprocessTimeline (state) {
      const phils = state.phils;
      return phils.map(d => {
        return {
          id: d.id,
          name: d.name,
          born: d.born,
          died: d.died
        }
      }).sort((d1, d2) => {
        if (d1.born > d2.born) return 1;
        else if (d1.born < d2.born) return -1;
        else {
          if (d1.died > d2.died) return 1;
          else if (d1.died < d2.died) return -1;
        }
      });
    }
  },
  actions: {
    updatePhils (data) {
      this.phils = data;
    }
  }
})
