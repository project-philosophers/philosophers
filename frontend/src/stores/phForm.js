import { defineStore } from 'pinia'

export const usePhForm = defineStore({
  id: 'phForm',
  state: () => ({
  "id": "",
  "name": "",
  "name_original": '',
  "name_other": '',
  "born": '',
  "born_date": '',
  "born_questioning": false,
  "died": '',
  "died_date": '',
  "died_questioning": false,
  "gender": "",
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

export const usePhInfo = defineStore({
  id: 'phInfo',
  state: () => ({}),
  actions: {
  }
})