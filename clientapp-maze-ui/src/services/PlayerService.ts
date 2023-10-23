import { BaseService } from "./Common/BaseService";
import type { AxiosResponse } from "axios";

import { RegisterPlayerQuery } from "@/models/RegisterPlayerQuery";
import { PlayerInfoDto } from "@/models/PlayerInfoDto";
export class PlayerService extends BaseService {
  constructor() {
    super("player");
  }
  registerPlayer(query: RegisterPlayerQuery): Promise<AxiosResponse<string>> {
    let queryString = "?";
    let prepend = "";
    if (query.name) { queryString += `${prepend}name=${query.name}`; prepend = '&'; }
    return this.client.Post<string>(`${this.baseUrl}/register${queryString}`)
  }
  getPlayerInfo(): Promise<AxiosResponse<PlayerInfoDto>> {
    return this.client.Get<PlayerInfoDto>(`${this.baseUrl}`)
  }
  forgetCurrentProgress(): Promise<AxiosResponse<string>> {
    return this.client.Delete<string>(`${this.baseUrl}/forget`)
  }
}