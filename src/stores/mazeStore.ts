import { defineStore } from 'pinia'

export const useMazeStore = defineStore('maze', {
  state: () => {
    return {
      enteredMazes: localStorage.getItem('enteredMazes') ? JSON.parse(localStorage.getItem('enteredMazes') as string) : [],
      currentMaze: localStorage.getItem('currentMaze') ? JSON.parse(localStorage.getItem('currentMaze') as string) : {}
    }
  },
  getters: {
    getEnteredMazes(state) {
      return state.enteredMazes;
    },
    getCurrentMaze(state) {
      return state.currentMaze
    }
  },
  actions: {
    setEnteredMazes(mazeName: string) {
      this.enteredMazes = [...this.enteredMazes, mazeName]
      localStorage.setItem('enteredMazes', JSON.stringify(this.enteredMazes))
    },
    setCurrentMaze(mazeName: object) {
      this.currentMaze = mazeName
      localStorage.setItem('currentMaze', JSON.stringify([this.currentMaze]))
    }
  }
})
