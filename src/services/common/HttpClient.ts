import type { AxiosResponse } from "axios";
import axios from './axios-service'

export class HttpClient {
  Get<T>(url: string): Promise<AxiosResponse<T>> {

    return axios.get<T>(url);
  }
  Post<T>(url: string): Promise<AxiosResponse<T>> {
    return axios.post<T>(url);
  }
  Put<T>(url: string, item: any): Promise<AxiosResponse<T>> {
    return axios.put<T>(url, item);
  }
  Delete<T>(url: string): Promise<AxiosResponse<T>> {
    return axios.delete<T>(url);
  }
}
