export class MoveActionsDto {
  constructor() {
    this.allowsExit = false;
    this.allowsScoreCollection = false
    this.direction = "";
    this.hasBeenVisited = false;
    this.isStart = false;
    this.rewardOnDestination = 0;
    this.tagOnTile = null

  }

  allowsExit: boolean;
  allowsScoreCollection: boolean;
  direction: string;
  hasBeenVisited: boolean;
  isStart: boolean;
  rewardOnDestination: number;
  tagOnTile: boolean | null;
}