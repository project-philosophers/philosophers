import { defineStore } from 'pinia'

export const useUserInfo = defineStore({
  id: 'userInfo',
  state: () => ({
    info: {
      id: '',
      name: ''
    }
  }),
  getters: {
    getUserInfo: (state) => state.info
  },
  actions: {
    addUserInfo(data) {
      this.info = data;
    },
    removeUserInfo() {
      this.info = {}
    }
  }
})
