import { defineStore } from 'pinia'
import { MoveActionsDto } from '@/models/MoveActionsDto';

export const useMazeStore = defineStore('maze', {
  state: () => {
    return {
      enteredMazes: localStorage.getItem('enteredMazes') ? JSON.parse(localStorage.getItem('enteredMazes') as string) : [],
      currentMaze: localStorage.getItem('currentMaze') ? JSON.parse(localStorage.getItem('currentMaze') as string) : {},
      currentMazeName: localStorage.getItem('currentMazeName') ? JSON.parse(localStorage.getItem('currentMazeName') as string) : null,
      collectedScores: localStorage.getItem('collectedScores') ? JSON.parse(localStorage.getItem('collectedScores') as string) : [],
      exitPath: localStorage.getItem('exitPath') ? JSON.parse(localStorage.getItem('exitPath') as string) : [],
      pathToStart: localStorage.getItem('pathToStart') ? JSON.parse(localStorage.getItem('pathToStart') as string) : [],
      isExitFound: localStorage.getItem('isExitFound') ?? false as boolean | string,
      isScoreCollectionPointFound: localStorage.getItem('isScoreCollectionPointFound') as boolean | string,
      lastScoreCollectionPoint: localStorage.getItem('lastScoreCollectionPoint') ? JSON.parse(localStorage.getItem('lastScoreCollectionPoint') as string) : [],
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
    },
    getExitPath(state) {
      return state.exitPath
    },
    getPathToStart(state) {
      return state.pathToStart
    },
    getIsExitFound(state) {
      return state.isExitFound === 'true'
    },
    getIsScoreCollectionPointFound(state) {
      return state.isScoreCollectionPointFound === 'true'
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
      localStorage.setItem('collectedScores', JSON.stringify(this.collectedScores))
    },
    setExitPath(direction: string, reset?: boolean, deleteFirstPath?: boolean) {
      let oppositeDirection = ''
      if (direction === 'Up') {
        oppositeDirection = 'Down'
      }
      if (direction === 'Down') {
        oppositeDirection = 'Up'
      }
      if (direction === 'Left') {
        oppositeDirection = 'Right'
      }
      if (direction === 'Right') {
        oppositeDirection = 'Left'
      }

      if (reset) {
        this.exitPath = []
      }
      if (oppositeDirection.length > 0) {
        this.exitPath.unshift(oppositeDirection)
      }
      if (deleteFirstPath) {
        this.exitPath.splice(0, 1)
      }
      localStorage.setItem('exitPath', JSON.stringify(this.exitPath))
    },
    setIsExitFound(exitFound: boolean) {
      this.isExitFound = exitFound
      localStorage.setItem('isExitFound', exitFound.toString())
    },
    setIsScoreCollectionPointFound(scoreCollectionPointFound: boolean) {
      this.isScoreCollectionPointFound = scoreCollectionPointFound
      localStorage.setItem('isScoreCollectionPointFound', this.isScoreCollectionPointFound.toString())
    },
    setPathToStart(direction: string, deleteFirstPath?: boolean) {
      let oppositeDirection = ''
      if (direction === 'Up') {
        oppositeDirection = 'Down'
      }
      if (direction === 'Down') {
        oppositeDirection = 'Up'
      }
      if (direction === 'Left') {
        oppositeDirection = 'Right'
      }
      if (direction === 'Right') {
        oppositeDirection = 'Left'
      }
      if (oppositeDirection.length > 0) {
        this.pathToStart.unshift(oppositeDirection)
      }
      if (deleteFirstPath) {
        this.pathToStart.splice(0, 1)
      }
      localStorage.setItem('pathToStart', JSON.stringify(this.pathToStart))
    },
    setLastScoreCollectionPoint(direction: string, reset?: boolean, deleteFirstPath?: boolean) {
      let oppositeDirection = ''
      if (direction === 'Up') {
        oppositeDirection = 'Down'
      }
      if (direction === 'Down') {
        oppositeDirection = 'Up'
      }
      if (direction === 'Left') {
        oppositeDirection = 'Right'
      }
      if (direction === 'Right') {
        oppositeDirection = 'Left'
      }
      if (reset) {
        this.lastScoreCollectionPoint = []
      }
      if (oppositeDirection.length > 0) {
        this.lastScoreCollectionPoint.unshift(oppositeDirection)
      }
      if (deleteFirstPath) {
        this.lastScoreCollectionPoint.splice(0, 1)
      }
      localStorage.setItem('lastScoreCollectionPoint', JSON.stringify(this.lastScoreCollectionPoint))
    }
  }
})
