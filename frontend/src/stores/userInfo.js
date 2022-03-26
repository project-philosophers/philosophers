import { defineStore } from 'pinia'

export const useUserInfo = defineStore({
  id: 'userInfo',
  state: () => ({
    userInfo: {}
  }),
  getters: {
  },
  actions: {
    addUserInfo (data) {
      this.userInfo = data;
    },
    removeUserInfo () {
      this.userInfo = {}
    }
  }
})
