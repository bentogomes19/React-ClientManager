export interface ApiResponse<T> {
  qtdClientesClasseA(qtdClientesClasseA: any): unknown;
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