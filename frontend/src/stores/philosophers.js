import { defineStore } from 'pinia'

export const useStorePhils = defineStore({
  id: 'storePhils',
  state: () => ({
    data: []
  }),
  getters: {
    preprocessTimeline (state) {
      const phils = state.data;
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
    setStorePhils(data) {
      this.data = data;
    }
  }
})

export const usePresentPhils = defineStore({
  id: 'presentPhils',
  state: () => ({
    data: []
  }),
  getters: {
    getPresentPhils: (state) => state.data,
  },
  actions: {
    setPresentPhils(data) {
      this.data = data;
    }
  } 
})
