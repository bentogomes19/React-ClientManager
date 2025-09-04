import axios, { AxiosInstance } from "axios";
import { ApiResponse, ApiResponseTable } from "../types";

export class ApiClient {
  static get<T, U>() {
    throw new Error("Method not implemented.");
  }
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;
  private readonly timeout = 30000;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:5156/api/",
      timeout: this.timeout,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  async get<TResponse, TParams = any>(url: string, params?: TParams) {
    return this.axiosInstance.get<ApiResponse<TResponse>>(url, { params });
  }

  async getTableData<TResponse, TParams = any>(url: string, params?: TParams) {
    return this.axiosInstance.get<ApiResponseTable<TResponse>>(url, { params });
  }

  async getById<TResponse, TParams = any>(
    url: string,
    id: string | number,
    params?: TParams
  ) {
    const finalUrl = `${url}/${id}`;
    return this.axiosInstance.get<ApiResponse<TResponse>>(finalUrl, { params });
  }

  async post<TResponse = any, TRequest = any>(url: string, data?: TRequest) {
    return this.axiosInstance.post<ApiResponse<TResponse>>(url, data);
  }

  async put<TResponse, TRequest>(
    url: string,
    id: string | number,
    data: TRequest
  ) {
    const finalUrl = `${url}/${id}`;
    return this.axiosInstance.put<ApiResponse<TResponse>>(finalUrl, data);
  }

  async patch<TResponse, TRequest = any>(url: string, data?: TRequest) {
    return this.axiosInstance.patch<TResponse>(url, data);
  }

  async delete<TResponse, TRequest = any>(url: string, data?: TRequest) {
    return this.axiosInstance.delete<TResponse>(url, { data });
  }
}
