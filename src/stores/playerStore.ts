import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      userToken: "HTI Thanks You [j3x]"
    }
  },
  getters: {
    getUserToken(state) {
      return state.userToken;
    },
  }
})
