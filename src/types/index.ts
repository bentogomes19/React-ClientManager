export interface ApiResponse<T> {
  totalItems: number;
  data: T;
  message: string;
}

export interface ApiResponseTable<T> {
  data: T;
  totalItems: number;
}


export interface ApiResponseMessage {
  message: string;
}