import { API_BASE } from "@/config/settings";
import { usePlayerStore } from "@/stores/playerStore";
import axios from "axios";

const axiosConfig = axios.create({ baseURL: API_BASE })

axiosConfig.interceptors.request.use(
  config => {
    const playerStore = usePlayerStore()
    const userToken = playerStore.userToken ?? "";
    if (userToken != null && userToken != undefined) {
      if (config.headers) {
        config.headers["Authorization"] = `${userToken}`;
      }
    }
    return config;
  }
)

export default axiosConfig