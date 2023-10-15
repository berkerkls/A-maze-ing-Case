import { BaseService } from "./common/BaseService";
import type { AxiosResponse } from "axios";

export class MazeService extends BaseService {
  constructor() {
    super("maze");
  }

  getPossibleActions(): Promise<AxiosResponse<string>> {
    console.log("", `${this.baseUrl}/possibleActions`)
    // return this.client.Post<string>(`${this.baseUrl}/Sync`, null)
  }
}