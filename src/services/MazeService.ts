import { BaseService } from "./Common/BaseService";
import type { AxiosResponse } from "axios";

export class MazeService extends BaseService {
  constructor() {
    super("maze");
  }
  getPossibleActions(): Promise<AxiosResponse<any>> {
    return this.client.Get<string>(`${this.baseUrl}/possibleActions`)
  }

}