import { MoveActionsDto } from "./MoveActionsDto";
export class MazeInformationDto {
  constructor() {
    this.canCollectScoreHere = false;
    this.canExitMazeHere = false
    this.currentScoreInBag = 0;
    this.currentScoreInHand = 0;
    this.possibleMoveActions = new Array<MoveActionsDto>();
    this.tagOnCurrentTile = null;

  }

  canCollectScoreHere: boolean;
  canExitMazeHere: boolean;
  currentScoreInBag: number;
  currentScoreInHand: number;
  possibleMoveActions: Array<MoveActionsDto>;
  tagOnCurrentTile: boolean | null;
}