import { defineStore } from 'pinia'

export const usePhForm = defineStore({
  id: 'phForm',
  state: () => ({
    "id": '',
    "name": '',
    "name_original": '',
    "name_other": '',
    "born": '',
    "born_date": '',
    "born_questioning": false,
    "died": '',
    "died_date": '',
    "died_questioning": false,
    "gender": '',
    "birthplace": '',
    "deathplace": '',
    "influences": [],
    "influenced": [],
  }),
  getters: {
    info: (state) => state,
  },
  actions: {
  }
})

export const usePhInput = defineStore({
  id: 'phInput',
  state: () => ({
    data: {}
  }),
  actions: {
    init(input) {
      this.data = input;
    },
    update(input) {
      this.data = input;
    }
  }
})