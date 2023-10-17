import { defineStore } from 'pinia'

export const useMazeStore = defineStore('maze', {
  state: () => {
    return {
      enteredMazes: localStorage.getItem('enteredMazes') ? JSON.parse(localStorage.getItem('enteredMazes') as string) : [],
      currentMaze: localStorage.getItem('currentMaze') ? JSON.parse(localStorage.getItem('currentMaze') as string) : {},
      currentMazeName: localStorage.getItem('currentMazeName') ? JSON.parse(localStorage.getItem('currentMazeName') as string) : null,
      collectedScores: localStorage.getItem('collectedScores') ? JSON.parse(localStorage.getItem('collectedScores') as string) : [],
    }
  },
  getters: {
    getEnteredMazes(state) {
      return state.enteredMazes;
    },
    getCurrentMaze(state) {
      return state.currentMaze
    },
    getCurrentMazeName(state) {
      return state.currentMazeName
    },
    getCollectedScores(state) {
      return state.collectedScores
    }
  },
  actions: {
    setEnteredMazes(mazeName: object) {
      this.enteredMazes = [...this.enteredMazes, mazeName]
      localStorage.setItem('enteredMazes', JSON.stringify(this.enteredMazes))
    },
    setCurrentMaze(maze: object) {
      this.currentMaze = maze
      localStorage.setItem('currentMaze', JSON.stringify([this.currentMaze]))
    },
    setCurrentMazeName(mazeName: string) {
      this.currentMazeName = mazeName
      localStorage.setItem('currentMazeName', JSON.stringify([this.currentMazeName]))
    },
    setCollectedScores(collectedScore: any) {
      if (this.collectedScores.some((el: any) => el.mazeName == collectedScore.mazeName)) {
        this.collectedScores.map((item: any) => {
          if (item.mazeName === collectedScore.mazeName) {
            item.collectedScore += collectedScore.collectedScore
          }
        })
      } else {
        this.collectedScores = [...this.collectedScores, collectedScore]
      }
      localStorage.setItem('collectedScores', JSON.stringify([this.collectedScores]))
    }
  }
})
