import { defineStore } from 'pinia'

export const useGraphType = defineStore({
  id: 'graphType',
  state: () => ({
    type: 'table'
  }),
  actions: {
    switchType(type) {
      this.type = type;
    }
  }
})

export const useTagsType = defineStore({
  id: 'tagsType',
  state: () => ({
    type: ''
  }),
  actions: {
    switchType(type) {
      this.type = type;
    }
  }
})

export const useViewType = defineStore({
  id: 'viewType',
  state: () => ({
    type: ['graph', 'table']
  }),
  actions: {
    switchType(type) {
      this.type = type;
    }
  }
})