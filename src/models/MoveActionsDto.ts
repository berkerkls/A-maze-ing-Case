export class MoveActionsDto {
  constructor() {
    this.allowsExit = false;
    this.allowScoreCollection = false
    this.direction = "";
    this.hasBeenVisited = false;
    this.isStart = false;
    this.rewardOnDestination = 0;
    this.tagOnTile = null

  }

  allowsExit: boolean;
  allowScoreCollection: boolean;
  direction: string;
  hasBeenVisited: boolean;
  isStart: boolean;
  rewardOnDestination: number;
  tagOnTile: boolean | null;
}