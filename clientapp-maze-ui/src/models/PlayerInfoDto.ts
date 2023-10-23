export class PlayerInfoDto {
  constructor() {
    this.playerId = 0;
    this.name = "";
    this.isInMaze = false;
    this.maze = "";
    this.hasFoundEasterEgg = false;
    this.mazeScoreInHand = 0;
    this.mazeScoreInBag = 0;
    this.playerScore = 0
  }

  playerId: number;
  name: string;
  isInMaze: boolean;
  maze: string;
  hasFoundEasterEgg: boolean;
  mazeScoreInHand: number;
  mazeScoreInBag: number;
  playerScore: number
}