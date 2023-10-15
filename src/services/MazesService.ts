import { BaseService } from "./Common/BaseService";
import type { AxiosResponse } from "axios";

import { AllMazesDto } from "@/models/AllMazesDto";
import { EnterMazeQuery } from "@/models/EnterMazeQuery";

export class MazesService extends BaseService {
  constructor() {
    super("mazes");
  }
  getMazes(): Promise<AxiosResponse<Array<AllMazesDto>>> {
    return this.client.Get<Array<AllMazesDto>>(`${this.baseUrl}/mazes`)
  }

  enterMaze(query: EnterMazeQuery): Promise<AxiosResponse<string>> {
    let queryString = "?";
    let prepend = "";
    if (query.mazeName) { queryString += `${prepend}mazeName=${query.mazeName}`; prepend = '&'; }
    return this.client.Post<string>(`${this.baseUrl}/${queryString}`)
  }
}