import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      userToken: "HTI Thanks You [j3x]",
      isRegistered: localStorage.getItem('isRegistered') as boolean | string
    }
  },
  getters: {
    getUserToken(state) {
      return state.userToken;
    },
    getRegistered(state) {
      return state.isRegistered === 'true'
    }
  },
  actions: {
    setIsRegistered(registrationInfo: boolean) {
      this.isRegistered = registrationInfo
      localStorage.setItem('isRegistered', registrationInfo.toString())
    }
  }
})
