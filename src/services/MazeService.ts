import { BaseService } from "./Common/BaseService";
import type { AxiosResponse } from "axios";

import { MoveSuppliedDirectionQuery } from "@/models/moveSuppliedDirectionQuery";



export class MazeService extends BaseService {
  constructor() {
    super("maze");
  }
  getPossibleActions(): Promise<AxiosResponse<string>> {
    return this.client.Get<string>(`${this.baseUrl}/possibleActions`)
  }

  moveSuppliedDirection(query: MoveSuppliedDirectionQuery): Promise<AxiosResponse<string>> {
    let queryString = "?";
    let prepend = "";
    if (query.direction) { queryString += `${prepend}direction=${query.direction}`; prepend = '&'; }
    return this.client.Post<string>(`${this.baseUrl}/${queryString}`)
  }

  // todo : tag service

  collectScore(): Promise<AxiosResponse<string>> {
    return this.client.Post<string>(`${this.baseUrl}/collectScore`)
  }

  exitMaze(): Promise<AxiosResponse<string>> {
    return this.client.Post<string>(`${this.baseUrl}/exit`)
  }
}